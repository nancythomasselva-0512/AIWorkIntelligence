import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('worklogs/csv')
  async downloadWorklogsCsv(@Request() req, @Res() res: Response) {
    const csvString = await this.reportsService.generateWorklogsCsv(req.user);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `worklogs_report_${timestamp}.csv`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    res.status(200).send(csvString);
  }
}
