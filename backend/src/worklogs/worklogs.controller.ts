import { Controller, Get, Post, Body, Query, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorklogsService } from './worklogs.service';

@Controller('worklogs')
@UseGuards(JwtAuthGuard)
export class WorklogsController {
  constructor(private readonly worklogsService: WorklogsService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('limit') limit?: string,
    @Query('timeframe') timeframe?: string,
    @Query('date') date?: string
  ) {
    return this.worklogsService.findAll(req.user, limit ? parseInt(limit) : undefined, timeframe, date);
  }

  @Post()
  create(@Request() req: any, @Body() body: any) {
    return this.worklogsService.create(req.user, body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.worklogsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.worklogsService.delete(id);
  }
}
