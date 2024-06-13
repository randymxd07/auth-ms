import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('Main Auth Microservice');

  const app = await NestFactory.create(AppModule);

  await app.listen(envs.port);

  logger.log(`Auth Microservice running on port: ${envs.port}`);

}
bootstrap();
