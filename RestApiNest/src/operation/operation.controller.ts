import { Body, Param, Get, Post, Controller} from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationResponseDto } from './dto/operation-response.dto';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post()
  async create(
    @Body() createOperationDto: CreateOperationDto,
  ): Promise<OperationResponseDto> {
    return this.operationService.createOperation(createOperationDto);
  }

  @Get()
  async findAll(): Promise<OperationResponseDto[]> {
    return this.operationService.getAllOperations();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OperationResponseDto> {
    return this.operationService.getOperationById(id);
  }
}
