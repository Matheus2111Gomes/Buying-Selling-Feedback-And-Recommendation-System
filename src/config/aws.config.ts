// src/config/aws.config.ts
import { DynamoDB } from 'aws-sdk';

export const awsConfig = {
    region: 'your-region',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

const dynamoDB = new DynamoDB.DocumentClient(awsConfig);

export { dynamoDB };