import { Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ProductService } from '../product.service'
import { CreateProductDto } from '../dto/create-product.dto';


let productService: ProductService;

const init = async()=>{
    const app = await NestFactory.createApplicationContext(AppModule);
    productService = app.get(ProductService);
}

export const handler = async( event: APIGatewayEvent, context: Context, callback: Callback) =>{
    if (!productService) {
        await init();
    }

    const createProductDto: CreateProductDto = JSON.parse(event.body);
    const product = await productService.create(createProductDto);

    return product;
};
