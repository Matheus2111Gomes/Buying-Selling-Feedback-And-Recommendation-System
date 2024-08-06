import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { dynamoDB } from 'src/config/aws.config';

@Injectable()
export class ProductService {
  private readonly tableName = process.env.DYNAMODB_TABLE;

  async create(createProductDto: CreateProductDto): Promise<any> {
    const { name, description } = createProductDto;
    if (!name || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required fields: name and description',
        }),
      };
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuidv4(),
        name,
        description,
        createdAt: new Date().toISOString(),
      },
    };

    try {
      await dynamoDB.put(params).promise();
      return {
        statusCode: 201,
        body: JSON.stringify(params.Item),
      };
    } catch (error) {
      console.error('Error saving product to DynamoDB:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const params = {
      TableName: this.tableName,
    };
    try {
      const result = await dynamoDB.scan(params).promise();
      console.log(result);

      return result.Items as ProductResponseDto[];
    } catch (error) {
      console.error('Error scanning DynamoDB:', error);
      throw new Error(`Error fetching products: ${error.message}`);
    }
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
