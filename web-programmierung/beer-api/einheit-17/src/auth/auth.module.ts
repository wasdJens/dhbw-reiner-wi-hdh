import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    // Async: Das Secret steht erst fest, wenn ConfigService .env gelesen hat
    JwtModule.registerAsync({
      // JwtService in jedem Module, ohne Import
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // Fehlt JWT_SECRET, startet der Server nicht
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
