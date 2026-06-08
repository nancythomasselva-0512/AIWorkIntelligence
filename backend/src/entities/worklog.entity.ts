import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Organization } from './organization.entity';

@Entity('work_logs')
export class WorkLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  @Column({ nullable: true })
  original_audio_url: string;

  @Column({ type: 'text' })
  transcribed_text: string;

  @Column({ type: 'text', nullable: true })
  ai_summary: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  sub_category: string;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({ type: 'text', nullable: true })
  attachment_url: string;

  @Column({ nullable: true })
  attachment_name: string;

  @Column({ default: 'logged' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ default: false })
  is_revenue_generating: boolean;

  @Column({ type: 'date', nullable: true })
  logged_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
