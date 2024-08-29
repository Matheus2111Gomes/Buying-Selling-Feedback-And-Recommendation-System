import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class FeedbackConsumerService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    console.log("--------=================-------------------------")
    this.kafkaClient.subscribeToResponseOf('feedback.stored');
    this.kafkaClient.connect();
  }

  @MessagePattern('feedback.stored')
  async handleFeedbackStored(message: any) {
    const { rating, feedbackId } = message.value;

    const averageRating = await this.calculateAverageRating(feedbackId);

    console.log("---------------------------------")
    console.log(averageRating)
  }

  async calculateAverageRating(feedbackId: string): Promise<number> {
    const feedbacks = await this.prisma.feedback.findMany({
      where: {
        productId: feedbackId
      }
    });
    console.log("==========================")
    console.log(feedbacks)
    const total = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return feedbacks.length > 0 ? total / feedbacks.length : 0;
  }
}