import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Product } from './product.entity';
import { dynamoDB } from 'src/config/aws.config';


@Injectable()
export class ProductService{
    private readonly tableName = process.env.DYNAMODB_TABLE;


    async create(createProductDto: CreateProductDto): Promise<ProductResponseDto>{
        const product: Product ={
            id: uuidv4(),
            ...createProductDto,
            createdAt: new Date()
        }

        const params = {
            TableName: this.tableName,
            Item: product,
        }

        await dynamoDB.put(params).promise();

        return product;
    }

    async findAll(): Promise<ProductResponseDto[]>{

        const params = {
            TableName: this.tableName,
        }
        const result = await dynamoDB.scan(params).promise();
        return result.Items as ProductResponseDto[];
    }

    async findOne(id: string): Promise<ProductResponseDto> {
        const params = {
          TableName: this.tableName,
          Key: { id },
        };
    
        const result = await dynamoDB.get(params).promise();
        return result.Item as ProductResponseDto;
      }

}