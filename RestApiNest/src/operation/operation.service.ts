import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Operation } from '@prisma/client';

@Injectable()
export class OperationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOperation(data: Prisma.OperationCreateInput): Promise<Operation> {
    return this.prisma.operation.create({
      data,
    });
  }

  async getAllOperations(): Promise<Operation[]> {
    return this.prisma.operation.findMany();
  }

  async getOperationById(id: string): Promise<Operation | null> {
    return this.prisma.operation.findUnique({
      where: { id },
    });
  }

  async updateOperation(id: string, data: Prisma.OperationUpdateInput): Promise<Operation> {
    return this.prisma.operation.update({
      where: { id },
      data,
    });
  }

  async deleteOperation(id: string): Promise<Operation> {
    return this.prisma.operation.delete({
      where: { id },
    });
  }
}