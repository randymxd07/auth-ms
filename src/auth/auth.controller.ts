import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, LoginUserDto, RegisterUserDto, VerifyUserDto } from './dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @HttpCode(201)
  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @HttpCode(200)
  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @HttpCode(200)
  @MessagePattern('auth.verify.user')
  verifyUser(@Payload() { token }: VerifyUserDto) {
    return this.authService.verifyUser(token);
  }

  @HttpCode(200)
  @MessagePattern('auth.change.password')
  changePassword(@Payload() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

}
