import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './app.entity'; // وارد کردن entity User
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User) // تزریق مستقیم Repository
    private readonly userRepository: Repository<User>,
    private readonly appService: AppService  // استفاده از Repository
  ) {}

  @Get('users')
  async findAll() {
    return this.userRepository.find(); // استفاده از روش‌های Repository برای خواندن داده‌ها
  }

  @Get('/gethello')
  getHello() {
    return this.appService.getHello();
  }
}
