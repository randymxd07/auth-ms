import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { LoginUserDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(private readonly jwtService: JwtService) { }

    async signJWT(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async registerUser(registerUserDto: RegisterUserDto) {

        try {

            // TODO: REGISTRAR UN USUARIO //

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

    async loginUser(loginUserDto: LoginUserDto) {

        try {

            // TODO: LOGGEAR UN USUARIO //

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

    async verifyToken(token: string) {

        try {

            // TODO: VERIFICAR EL TOKEN //

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

}
