import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkLog } from '../entities/worklog.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(WorkLog)
    private worklogRepository: Repository<WorkLog>,
  ) {}

  async generateWorklogsCsv(user: any): Promise<string> {
    const query = this.worklogRepository.createQueryBuilder('log')
      .leftJoinAndSelect('log.user', 'user')
      .orderBy('log.created_at', 'DESC');
    
    if (user.role !== 'it_administrator') {
      query.andWhere('user.id = :userId', { userId: user.userId });
    }

    const logs = await query.getMany();

    // Build CSV Header
    const headers = ['Date', 'User', 'Role', 'Category', 'Sub Category', 'Status', 'Description', 'Tags'];
    
    const rows = logs.map(log => {
      const date = new Date(log.created_at).toLocaleString().replace(/,/g, '');
      const userName = log.user?.full_name || 'Unknown';
      const role = log.user?.role || 'Unknown';
      const category = log.category || '';
      const subCategory = log.sub_category || '';
      const status = log.status || '';
      // Escape quotes and wrap description in quotes to handle commas
      const textContent = `"${(log.transcribed_text || '').replace(/"/g, '""')}"`;
      const tags = `"${(log.tags || '').replace(/"/g, '""')}"`;

      return [date, userName, role, category, subCategory, status, textContent, tags].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}
