import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService{
    private products: Product[] = []

    create(createProductDto: CreateProductDto): ProductResponseDto{
        const product: Product ={
            id: uuidv4(),
            ...createProductDto,
            createdAt: new Date()
        }
        this.products.push(product);
        return product;
    }

    findAll(): ProductResponseDto[]{
        return this.products;
    }

    findOne(id:string): ProductResponseDto{
        return this.products.find(product => product.id === id);
    }

}