import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLog } from '../entities/worklog.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLog])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
