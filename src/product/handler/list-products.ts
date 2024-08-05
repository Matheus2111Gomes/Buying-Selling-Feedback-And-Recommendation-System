import { Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ProductService } from '../product.service';

let productService: ProductService;

const init = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  productService = app.get(ProductService);
};

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (!productService) {
    await init();
  }

  const products = await productService.findAll();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(products),
  });
};