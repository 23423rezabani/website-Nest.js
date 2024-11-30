import { Injectable ,HttpException, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcryptjs";
import { async } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>){}

async findAll() {
  return await this.userRepository.find();
}


 async findUser(id:number) {
  return await this.userRepository.findOneBy({id})
 }

 async updateUser(id:number,password:string) {

   const user = await this.userRepository.findOneBy({id});
   
   if(!user)  throw new HttpException("user not found",404);

   const hashpassword = await bcrypt.hash(password,10);

user.password = hashpassword;
return await this.userRepository.save(user)


 }

  DeleteUser =async (id:number)=>{
    const user = await this.userRepository.findOneBy({id});

    if(!user) throw new HttpException("user not found",404)


    await this.userRepository.delete(user)
    
    return {
      message:"your account has delete"
    }
 }
}
