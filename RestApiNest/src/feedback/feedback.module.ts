import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { KafkaModule } from '../kafka/kafka.module'; 

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}