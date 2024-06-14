import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto, VerifyUserDto } from './dto';

@Controller('')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @HttpCode(201)
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @HttpCode(200)
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @HttpCode(200)
  @Post('verify-user')
  verifyUser(@Body() { token }: VerifyUserDto) {
    return this.authService.verifyUser(token);
  }

}
