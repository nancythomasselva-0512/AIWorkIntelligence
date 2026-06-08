import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  gst_number: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn()
  created_at: Date;
}
