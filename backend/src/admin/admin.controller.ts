import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private checkAdminRole(req: any) {
    if (req.user?.role !== 'employee') {
      throw new UnauthorizedException('Admin privileges required.');
    }
  }

  // --- Users ---
  @Get('users')
  async getUsers(@Request() req) {
    this.checkAdminRole(req);
    const data = await this.adminService.getAllUsers();
    return { data };
  }

  @Post('users')
  async createUser(@Request() req, @Body() body) {
    this.checkAdminRole(req);
    const data = await this.adminService.createUser(body);
    return { data, message: 'User created successfully' };
  }

  @Put('users/:id')
  async updateUser(@Request() req, @Param('id') id: string, @Body() body) {
    this.checkAdminRole(req);
    const data = await this.adminService.updateUser(id, body);
    return { data, message: 'User updated successfully' };
  }

  @Delete('users/:id')
  async deleteUser(@Request() req, @Param('id') id: string) {
    this.checkAdminRole(req);
    await this.adminService.deleteUser(id);
    return { success: true, message: 'User deleted successfully' };
  }

  // --- Organizations ---
  @Get('organizations')
  async getOrganizations(@Request() req) {
    this.checkAdminRole(req);
    const data = await this.adminService.getAllOrganizations();
    return { data };
  }

  @Post('organizations')
  async createOrganization(@Request() req, @Body() body) {
    this.checkAdminRole(req);
    const data = await this.adminService.createOrganization(body);
    return { data, message: 'Organization created successfully' };
  }

  @Put('organizations/:id')
  async updateOrganization(@Request() req, @Param('id') id: string, @Body() body) {
    this.checkAdminRole(req);
    const data = await this.adminService.updateOrganization(id, body);
    return { data, message: 'Organization updated successfully' };
  }

  @Delete('organizations/:id')
  async deleteOrganization(@Request() req, @Param('id') id: string) {
    this.checkAdminRole(req);
    await this.adminService.deleteOrganization(id);
    return { success: true, message: 'Organization deleted successfully' };
  }

  // --- Projects ---
  @Get('projects')
  async getProjects(@Request() req) {
    this.checkAdminRole(req);
    const data = await this.adminService.getAllProjects();
    return { data };
  }

  @Post('projects')
  async createProject(@Request() req, @Body() body) {
    this.checkAdminRole(req);
    const data = await this.adminService.createProject(body);
    return { data, message: 'Project created successfully' };
  }

  @Put('projects/:id')
  async updateProject(@Request() req, @Param('id') id: string, @Body() body) {
    this.checkAdminRole(req);
    const data = await this.adminService.updateProject(id, body);
    return { data, message: 'Project updated successfully' };
  }

  @Delete('projects/:id')
  async deleteProject(@Request() req, @Param('id') id: string) {
    this.checkAdminRole(req);
    await this.adminService.deleteProject(id);
    return { success: true, message: 'Project deleted successfully' };
  }
}
