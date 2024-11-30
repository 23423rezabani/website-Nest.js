import { Controller, Get,Res ,Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateregisterDto } from './dto/create-regsiter.dto';
import { createloginDto } from './dto/login-login.dto';
import { Response } from "express";
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateregisterDto) {
    return this.authService.register(createAuthDto);
  }
  
  @Post('login')
  login(@Body() createloginDto:createloginDto,@Res() res:Response){
     return this.authService.login(createloginDto,res);
  }

}
