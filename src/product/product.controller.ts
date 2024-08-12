import { Body, Param, Get, Post, Controller, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.create(createProductDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.findOne(id);
  }
}
