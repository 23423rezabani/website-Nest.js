import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // وارد کردن User Entity در ماژول
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
