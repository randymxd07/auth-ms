import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, LoginUserResponse, RegisterUserResponse } from './interfaces';
import { LoginUserDto, RegisterUserDto, VerifyUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { envs } from 'src/config';

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
                message: 'The user was created successfully',
            }

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

    /**========================================
     * LOGIN USER FUNCTION
     * @param {LoginUserDto} loginUserDto
     * @returns {Promise<LoginUserResponse>}
    ===========================================*/
    async loginUser(loginUserDto: LoginUserDto): Promise<LoginUserResponse> {

        try {

            const { email, password } = loginUserDto;

            const user = await this.usersRepository.findOne({email});

            if (!user) {
                throw new BadRequestException({
                    status: 400,
                    message: 'User/Password not valid'
                });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                throw new BadRequestException({
                    status: 400,
                    message: 'User/Password not valid'
                })
            }

            return {
                user: user.toObject(),
                token: await this.signJWT({
                    id: String(user._id),
                    email: user.email,
                    username: user.username
                }),
                message: 'The user logged in correctly'
            }

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

    async verifyUser(token: string) {

        try {

            const { sub, iat, exp, ...data } = this.jwtService.verify(token, {
                secret: envs.jwtSecret,
            });

            return {
                user: data,
                token: await this.signJWT(data)
            }

        } catch (error) {

            this.logger.error(error);

            throw new BadRequestException(error.message, error.detail);

        }

    }

}
