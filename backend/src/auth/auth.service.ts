import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload
    };
  }

  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      email: data.email,
      password_hash: hashedPassword,
      full_name: data.full_name,
      role: data.role || 'intern'
    });
    const { password_hash, ...result } = user;
    return result;
  }
}
