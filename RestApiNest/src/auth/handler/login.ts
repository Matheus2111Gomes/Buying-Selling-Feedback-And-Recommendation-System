import { Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
let authService: AuthService;
let userService: UserService;

const init = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  //const authService = app.get(AuthService);
  //const userService = app.get(UserService);
  authService = app.get(AuthService);
  userService = app.get(UserService);
};

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  if (!authService) {
    await init();
  }

  // const createProductDto: CreateProductDto = JSON.parse(event.body);
  try {
    console.log('aqui');
    const user: User = JSON.parse(event.body);
    const login = await authService.login(user);

    return login;
  } catch (error) {
    console.error('Error during login:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error.message,
      }),
    };
  }
};
