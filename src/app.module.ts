import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './app.entity'; // وارد کردن entity User
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './auth/profile/profile.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:WmqLvMXbECYlTOiztuaROYCVDIFJyzdG@autorack.proxy.rlwy.net:44683/railway',  
      entities: [User,Product], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    ProfileModule,
    ProductModule
     
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
