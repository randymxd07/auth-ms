import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, RegisterUserResponse } from './interfaces';
import { LoginUserDto, RegisterUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private readonly usersRepository: Model<User>,
    ) { }

    async signJWT(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    /**===========================================
     * REGISTER USER FUNCTION
     * @param {RegisterUserDto} registerUserDto 
     * @returns {Promise<RegisterUserResponse>}
    ==============================================*/
    async registerUser(registerUserDto: RegisterUserDto): Promise<RegisterUserResponse> {

        try {

            const { email, password } = registerUserDto;

            const user = await this.usersRepository.findOne({email});

            if (user) {
                throw new BadRequestException({
                    status: 400,
                    message: 'User already exists'
                });
            }

            const newUser = await this.usersRepository.create({
                ...registerUserDto,
                password: bcrypt.hashSync(password, 10),
            });

            return {
                data: newUser.toObject(),
                token: await this.signJWT({
                    id: String(newUser._id),
                    email: newUser.email,
                    username: newUser.username
                }),
            }

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

    async loginUser(loginUserDto: LoginUserDto) {

        try {

            return loginUserDto;

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

    async verifyToken(token: string) {

        try {

            return token;

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

}
