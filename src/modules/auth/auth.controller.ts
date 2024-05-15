import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../../entities/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { ExcludePasswordInterceptor } from '../../interceptors/excludePassword.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(ExcludePasswordInterceptor)
  async signUp(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.signUp(user);
  }

  @Post('signin')
  async signIn(@Body() credentials: LoginUserDto): Promise<object> {
    const { email, password } = credentials;
    return await this.authService.signIn(email, password);
  }
}
