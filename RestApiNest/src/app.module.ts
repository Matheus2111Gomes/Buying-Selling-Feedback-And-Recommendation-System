import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationModule } from './operation/operation.module';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    FeedbackModule,
    ProductModule,
    OperationModule,
    AuthModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
