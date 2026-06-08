import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { Project } from '../entities/project.entity';

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
