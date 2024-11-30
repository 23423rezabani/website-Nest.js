import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {  UseGuards } from '@nestjs/common/decorators';
import { jwtgaurdMiddleware } from 'src/auth/middelware/jwt.authGaurd';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("")
  @UseGuards(jwtgaurdMiddleware)
  findProduct() {
  return this.productService.findProducts();
  }

  @Get("/:id")
  findProductId(@Param("id")id:number) {
     return this.productService.findProductsId(id);
  }



  @Post("create")
  @UseGuards(jwtgaurdMiddleware)
  createProduct(@Body() createproductDto:CreateProductDto,@Req() req:any) {

    const userid = Number(req.user.id)
  return this.productService.createProduct(createproductDto,userid);
  }
 

}
