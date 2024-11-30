

import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { jwtgaurdMiddleware } from "../middelware/jwt.authGaurd"; 
import { Request } from "express";

@UseGuards(jwtgaurdMiddleware)
@Controller('profile')
export class ProfileController {
  @Get()
  getProfile(@Req() req: Request) {
    return {
      message: "Profile fetched successfully",
      user: req['user'], // اطلاعات کاربر
    };
  }
}