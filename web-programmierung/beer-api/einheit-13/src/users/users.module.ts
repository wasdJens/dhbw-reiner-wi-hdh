import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
import { UserRole } from './user-role.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
  providers: [UsersService],
  // AuthModule sucht User über diesen Service
  exports: [UsersService],
})
export class UsersModule {}
