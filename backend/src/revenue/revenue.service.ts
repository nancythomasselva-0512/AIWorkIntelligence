import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async findAll() {
    const invoices = await this.invoiceRepository.find({
      order: { created_at: 'DESC' }
    });
    const mappedInvoices = invoices.map(inv => ({
      ...inv,
      createdAt: inv.created_at
    }));
    return { data: mappedInvoices };
  }
}
