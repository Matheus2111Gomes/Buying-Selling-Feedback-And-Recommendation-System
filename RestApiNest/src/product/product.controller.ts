import { Body, Param, Get, Post, Controller} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.getProductById(id);
  }
}
