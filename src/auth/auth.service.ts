import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
//let userService: UserService;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    console.log(this.userService);
    console.log('top');
    console.log(this.jwtService);
    console.log('tip');
    const user = await this.userService.findByEmail(email);

    if (user && user.password === pass) {
      // In production, use a hashed password comparison
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(user: User) {
    console.log('oi');
    //    user = new User();
    //    user.email = 'teste';
    const userLogin = await this.validateUser(user.email, user.password);
    if (!userLogin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      username: userLogin.email,
      sub: userLogin.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
