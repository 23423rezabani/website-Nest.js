import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>){}


    findProducts=async()=>{
      return await this.productRepository.find();
    }


    findProductsId =async (id:number)=>{

      const product =await this.productRepository.findOneBy({id});

      if(!product) throw new HttpException("product not found",404);

      return {
        product: product
      }
    }



  createProduct =async(createProductDto:CreateProductDto,userid:number)=>{
    const {name,image,price,descreption} = createProductDto;

    const product = this.productRepository.create({
      name:name,
      userId:userid,
      image:image,
      price:price,
      descereption:descreption
    })
  return await this.productRepository.save(product)
  }



}
