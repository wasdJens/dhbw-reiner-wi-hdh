import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    if (await this.usersService.findByName(dto.name)) {
      throw new ConflictException(`User ${dto.name} already exists`);
    }
    // Kostenfaktor 10: 2^10 Runden, das Salt steht im Hash
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.usersService.create(dto.name, passwordHash);
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByName(dto.name);
    // compare hasht das Passwort mit dem Salt aus dem Hash und vergleicht
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid name or password');
    }
    const payload: JwtPayload = { sub: user.id, name: user.name };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
