import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { dynamoDB } from 'src/config/aws.config';

@Injectable()
export class ProductService {
  private readonly tableName = process.env.DYNAMODB_TABLE;

  private async getProductsInDynamo(atrb: string) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :pkPrefix AND begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':pkPrefix': 'PRODUCT#',
        ':skPrefix': atrb,
      },
    };

    try {
      const result = await dynamoDB.query(params).promise();

      return result.Items as ProductResponseDto[];
    } catch (error) {
      console.error('Error fetching products from DynamoDB:', error);
      throw new InternalServerErrorException('Could not fetch products');
    }
  }

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
    const cAt = new Date().toISOString();
    const productId = uuidv4();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        PK: `PRODUCT#`,
        SK: `PRODUCT#${productId}`,
        id: productId,
        name,
        description,
        createdAt: cAt,
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
    return this.getProductsInDynamo('PRODUCT#');
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    let product = await this.getProductsInDynamo('PRODUCT#' + id);
    return product[0];
  }
}
