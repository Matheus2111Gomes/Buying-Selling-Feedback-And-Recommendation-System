import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';


@Injectable()
export class AppService {
  private readonly dynamoDB: DynamoDB.DocumentClient;
  constructor() {
    this.dynamoDB = new DynamoDB.DocumentClient();
  }
}
