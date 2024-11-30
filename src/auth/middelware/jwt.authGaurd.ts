import { CanActivate,Injectable, HttpException, NestMiddleware, UnauthorizedException, ExecutionContext } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";
import * as JWT from "jsonwebtoken";
import { Observable } from "rxjs";
@Injectable()
export class jwtgaurdMiddleware implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
       const token =request.cookies.access_token;

       if(!token) throw new HttpException('your token has expired please login',404)

        try{
            
        const decode =JWT.verify(token,process.env.SECRET_KEY)

         request['user'] = decode;

         return true;

        }catch(err) {
        throw new UnauthorizedException("invalid or expired token")
       }
    
} 
}