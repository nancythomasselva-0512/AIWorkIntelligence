import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { Project } from './project.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ unique: true })
  invoice_number: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount_excluded: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 18.00 })
  gst_percentage: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  gst_amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total_amount: number;

  @Column({ default: 'draft' })
  status: string;

  @Column({ type: 'date', nullable: true })
  issued_date: Date;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
