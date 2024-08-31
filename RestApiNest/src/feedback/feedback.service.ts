import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Feedback } from '@prisma/client';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createFeedback(data: Prisma.FeedbackCreateInput): Promise<Feedback> {
    const feedback = await this.prisma.feedback.create({data,});

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