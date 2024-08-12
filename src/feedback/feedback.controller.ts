import { Body, Param, Get, Post, Controller, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly feedbackService: FeedbackService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  async findAll(): Promise<FeedbackResponseDto[]> {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FeedbackResponseDto> {
    return this.feedbackService.findOne(id);
  }
}
