import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, FeedbackModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
