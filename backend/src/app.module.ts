import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorklogsModule } from './worklogs/worklogs.module';
import { RevenueModule } from './revenue/revenue.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { AdminModule } from './admin/admin.module';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { User } from './entities/user.entity';
import { Organization } from './entities/organization.entity';
import { Project } from './entities/project.entity';
import { WorkLog } from './entities/worklog.entity';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Organization, Project, WorkLog, Invoice],
      synchronize: true, // Auto-create tables for SQLite
    }),
    AuthModule,
    UsersModule,
    WorklogsModule,
    RevenueModule,
    ReportsModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  async onModuleInit() {
    const admin = await this.usersService.findOne('admin@gmail.com');
    if (!admin) {
      console.log('Seeding IT Administrator: admin@gmail.com');
      await this.authService.register({
        email: 'admin@gmail.com',
        password: 'admin@123',
        full_name: 'IT Administrator',
        role: 'it_administrator'
      });
    }
  }
}

