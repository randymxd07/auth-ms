import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(envs.databaseUrl),
  ],
})
export class AppModule { }
