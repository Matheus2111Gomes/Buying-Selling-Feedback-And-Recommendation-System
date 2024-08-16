import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';

//let userService: UserService;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Exclude the password from the returned user object
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(user: User) {
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
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    let v = this.jwtService.sign(payload);
    return {
      access_token: v,
    };
  }
}
