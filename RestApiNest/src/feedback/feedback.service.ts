import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Feedback } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async createFeedback(data: Prisma.FeedbackCreateInput): Promise<Feedback> {
    const feedback = await this.prisma.feedback.create({data,});

    this.kafkaClient.emit('feedback.stored',{
      feedbackId: feedback.id,
      rating: feedback.rating,
    })

    return feedback;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return this.prisma.feedback.findMany();
  }

  async getFeedbackById(id: string): Promise<Feedback | null> {
    return this.prisma.feedback.findUnique({
      where: { id },
    });
  }

  async updateFeedback(id: string, data: Prisma.FeedbackUpdateInput): Promise<Feedback> {
    return this.prisma.feedback.update({
      where: { id },
      data,
    });
  }

  async deleteFeedback(id: string): Promise<Feedback> {
    return this.prisma.feedback.delete({
      where: { id },
    });
  }
}