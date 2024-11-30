import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Req,ForbiddenException, Res, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { jwtgaurdMiddleware } from 'src/auth/middelware/jwt.authGaurd';

// @UseGuards(jwtgaurdMiddleware)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("")
  findAll() {
    return this.userService.findAll(); 
  }



  @Get(":id")
  findUser(@Param("id")id:number) {
   return this.userService.findUser(id)
  }

  @Post("update/:id")
  @UseGuards(jwtgaurdMiddleware)
  updateUser(@Param('id')id:number,@Body('password')password:string,@Req() req:any){

    const paramId = Number(id);
    const userId =Number( req.user.id);

    if(paramId!==userId){
      throw new ForbiddenException("you can only update your own account")
    }
    return this.userService.updateUser(paramId,password)
  }

  @Delete("DeleteUser/:id")
  @UseGuards(jwtgaurdMiddleware)
  deleteUser(@Param("id")id:number,@Req() req:any) {
    const paramId = Number(id);
    const userId = Number(req.user.id);

    if(paramId !== userId) throw new ForbiddenException('you can only delete your own account')
    

    return this.userService.DeleteUser(id);
  }


}
