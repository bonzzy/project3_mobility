import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger('NestApplication');

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  await app.listen(config.get('PORT'));
  logger.log(`Listening to port: ${config.get('PORT')}`);
}

bootstrap();
