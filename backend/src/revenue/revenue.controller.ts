import { Controller, Get, UseGuards } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('revenue')
@UseGuards(JwtAuthGuard, RolesGuard) // Secure the entire controller
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  @Roles('it_administrator', 'mentor') // Interns cannot access revenue data
  findAll() {
    return this.revenueService.findAll();
  }
}
