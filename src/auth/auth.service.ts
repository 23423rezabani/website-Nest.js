import { Injectable , HttpException, Res } from '@nestjs/common';
import { CreateregisterDto } from './dto/create-regsiter.dto';
import { createloginDto } from './dto/login-login.dto';
import { User } from 'src/app.entity';
import *as jwt  from "jsonwebtoken";
import * as bcrypt from "bcryptjs"
import {Response} from "express";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
     private readonly userRepository:Repository<User> 
  ){}

 async register(createAuthDto: CreateregisterDto) {
   const {name ,email, password} = createAuthDto;

   const userExist = await this.userRepository.findOneBy({email});

   if(userExist){
    throw new HttpException('user already exist',403)
   }

   const hashpassord = await bcrypt.hash(password,10);

   const newUser =  this.userRepository.create({
     name:name,
     email:email,
     password:hashpassord
   })
   await this.userRepository.save(newUser)

   return{
    message:"created user",
    user:newUser
   }
  }


  async login(createloginDto:createloginDto,res:Response) {

    const {email, password } = createloginDto;

    const userExist = await this.userRepository.findOneBy({email});

    if(!userExist){
     throw new HttpException('email or password is wrong',404) 
    }
    
    const isMatch =  await bcrypt.compare(password,userExist.password.toString())
    
   
    if(!isMatch) {
      throw new HttpException('email or password is wrong',404)
    }

    const token = jwt.sign({id:userExist.id},process.env.SECRET_KEY,{expiresIn:"1d"});

res.cookie('access_token',token,{
  httpOnly:true
})

    return res.json({
      message:"login successfully",
      user:userExist
    }

  )}



}
