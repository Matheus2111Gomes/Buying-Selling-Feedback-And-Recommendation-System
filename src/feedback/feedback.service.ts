import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';
import { dynamoDB } from 'src/config/aws.config';

@Injectable()
export class FeedbackService {
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
      return result.Items as FeedbackResponseDto[];
    } catch (error) {
      console.error('Error fetching products from DynamoDB:', error);
      throw new InternalServerErrorException('Could not fetch products');
    }
  }

  async create(createFeedbackDto: CreateFeedbackDto): Promise<any> {
    const { userId, productId, rating, comment } = createFeedbackDto;
    if (!userId || !productId || !rating || !comment) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required fields',
        }),
      };
    }
    const cAt = new Date().toISOString();
    const id = uuidv4();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        PK: `FEEDBACK#`,
        SK: `FEEDBACK#${id}`,
        id: id,
        userId,
        productId,
        rating,
        comment,
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

  async findAll(): Promise<FeedbackResponseDto[]> {
    return this.getProductsInDynamo('PRODUCT#');
  }

  async findOne(id: string): Promise<FeedbackResponseDto> {
    return this.getProductsInDynamo('PRODUCT#' + id)[0];
  }
}
