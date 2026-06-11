import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { Project } from '../entities/project.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Organization) private orgRepository: Repository<Organization>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  // --- Users ---
  async getAllUsers() {
    return this.userRepository.find({
      select: ['id', 'email', 'full_name', 'role', 'created_at'],
      order: { created_at: 'DESC' }
    });
  }

  async createUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password || 'password123', 10);
    const user = this.userRepository.create({
      email: data.email,
      password_hash: hashedPassword,
      full_name: data.name || data.full_name,
      role: data.role || 'intern'
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, data: any) {
    const updateData: any = {};
    if (data.name || data.full_name) updateData.full_name = data.name || data.full_name;
    if (data.role) updateData.role = data.role;
    if (data.email) updateData.email = data.email;
    if (data.password) {
      updateData.password_hash = await bcrypt.hash(data.password, 10);
    }
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string) {
    // Delete user's work logs first to prevent foreign key constraint violations
    await this.userRepository.manager.delete('work_logs', { user: { id } });
    return this.userRepository.delete(id);
  }

  // --- Organizations ---
  async getAllOrganizations() {
    return this.orgRepository.find({
      order: { created_at: 'DESC' }
    });
  }

  async createOrganization(data: any) {
    const org = this.orgRepository.create(data);
    return this.orgRepository.save(org);
  }

  async updateOrganization(id: string, data: any) {
    await this.orgRepository.update(id, data);
    return this.orgRepository.findOne({ where: { id } });
  }

  async deleteOrganization(id: string) {
    return this.orgRepository.delete(id);
  }

  // --- Projects ---
  async getAllProjects() {
    return this.projectRepository.find({
      relations: ['organization'],
      order: { created_at: 'DESC' }
    });
  }

  async createProject(data: any) {
    const project = this.projectRepository.create({
      ...data,
      organization: { id: data.organizationId }
    });
    return this.projectRepository.save(project);
  }

  async updateProject(id: string, data: any) {
    await this.projectRepository.update(id, data);
    return this.projectRepository.findOne({ where: { id }, relations: ['organization'] });
  }

  async deleteProject(id: string) {
    return this.projectRepository.delete(id);
  }
}
