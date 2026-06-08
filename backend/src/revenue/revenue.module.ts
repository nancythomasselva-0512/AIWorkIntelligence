import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
import { Invoice } from '../entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
