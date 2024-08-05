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

  const { id } = event.pathParameters;
  const product = await productService.findOne(id);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(product),
  });
};