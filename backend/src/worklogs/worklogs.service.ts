import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkLog } from '../entities/worklog.entity';
import { CategorizationEngine } from './categorization.engine';

@Injectable()
export class WorklogsService {
  constructor(
    @InjectRepository(WorkLog)
    private worklogRepository: Repository<WorkLog>,
  ) {}

  async findAll(user: any, limit?: number, timeframe?: string, dateStr?: string) {
    const query = this.worklogRepository.createQueryBuilder('log')
      .leftJoinAndSelect('log.user', 'user')
      .orderBy('log.created_at', 'DESC');
    
    // Role-based separation logic
    if (user.role !== 'employee') {
      // Mentors and Interns only see their own logs
      query.andWhere('user.id = :userId', { userId: user.userId });
    }

    if (timeframe) {
      if (timeframe === 'today') {
        query.andWhere("date(log.created_at) = date('now')");
      } else if (timeframe === 'week') {
        query.andWhere("date(log.created_at) >= date('now', '-7 days')");
      } else if (timeframe === 'month') {
        query.andWhere("date(log.created_at) >= date('now', '-30 days')");
      }
    } else if (dateStr) {
      query.andWhere('DATE(log.created_at) = :date', { date: dateStr });
    }

    if (limit) {
      query.take(limit);
    }
    
    const logs = await query.getMany();
    // Map DB fields back to what the frontend currently expects
    const mappedLogs = logs.map(log => ({
      ...log,
      textContent: log.transcribed_text,
      createdAt: log.created_at,
      subCategory: log.sub_category,
      attachmentUrl: log.attachment_url,
      attachmentName: log.attachment_name,
      user: log.user ? {
        full_name: log.user.full_name,
        role: log.user.role,
        email: log.user.email
      } : null
    }));
    return { data: mappedLogs };
  }

  async create(user: any, data: any) {
    const analysis = CategorizationEngine.analyze(data.textContent);
    const category = (data.category && data.category !== 'General' && data.category !== 'Waiting...') 
      ? data.category 
      : analysis.category;
    
    // Merge frontend tags and engine tags
    const frontendTags = data.tags ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
    const engineTags = analysis.tags ? analysis.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
    const allTags = Array.from(new Set([...frontendTags, ...engineTags])).join(', ');

    // Look for an existing log for this user today using SQLite date function
    const existingLog = await this.worklogRepository.createQueryBuilder('log')
      .leftJoinAndSelect('log.user', 'user')
      .where('user.id = :userId', { userId: user.userId })
      .andWhere("date(log.created_at) = date('now')")
      .getOne();

    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const formattedEntry = `[${currentTime}] ${data.textContent}`;

    if (existingLog) {
      // Append the text content with a newline
      existingLog.transcribed_text = existingLog.transcribed_text + '\n\n' + formattedEntry;
      
      // Update tags
      const existingTagsList = existingLog.tags ? existingLog.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
      const newTagsList = allTags.split(',').map(t => t.trim()).filter(Boolean);
      existingLog.tags = Array.from(new Set([...existingTagsList, ...newTagsList])).join(', ');
      
      // Keep the newest attachment if provided
      if (data.attachmentBase64) {
        existingLog.attachment_url = data.attachmentBase64;
        existingLog.attachment_name = data.attachmentName;
      }
      
      return await this.worklogRepository.save(existingLog);
    }

    // Otherwise create a new log for today
    const newLog = this.worklogRepository.create({
      transcribed_text: formattedEntry,
      category: category,
      sub_category: analysis.subCategory,
      tags: allTags,
      attachment_url: data.attachmentBase64 || null,
      attachment_name: data.attachmentName || null,
      status: data.status || 'PENDING',
      user: { id: user.userId } as any,
    });
    
    return await this.worklogRepository.save(newLog);
  }

  async update(id: string, data: any) {
    const log = await this.worklogRepository.findOne({ where: { id } });
    if (!log) throw new NotFoundException('Log not found');
    
    // Only update allowed fields
    if (data.textContent) log.transcribed_text = data.textContent;
    if (data.status) log.status = data.status;
    if (data.category) log.category = data.category;
    
    return await this.worklogRepository.save(log);
  }

  async delete(id: string) {
    const result = await this.worklogRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Log not found');
    return { success: true };
  }
}
