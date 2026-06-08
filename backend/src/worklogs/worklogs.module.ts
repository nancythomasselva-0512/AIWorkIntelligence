import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorklogsController } from './worklogs.controller';
import { WorklogsService } from './worklogs.service';
import { WorkLog } from '../entities/worklog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLog])],
  controllers: [WorklogsController],
  providers: [WorklogsService],
})
export class WorklogsModule {}
