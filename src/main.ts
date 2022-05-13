import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FolderCrudModule } from './modules/folder-crud/folder.crud.module';
import { FileCrudModule } from './modules/file-crud/file.crud.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger('NestApplication');

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  const apiConfig = new DocumentBuilder()
    .setTitle('Filesystem API')
    .setDescription('The filesystem API documentation.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, apiConfig, {
    include: [FileCrudModule],
  });
  const folderApiConfig = new DocumentBuilder()
    .setTitle('Folder API')
    .setDescription('The folder API documentation.')
    .setVersion('1.0')
    .build();

  const folderSwaggerDocument = SwaggerModule.createDocument(
    app,
    folderApiConfig,
    {
      include: [FolderCrudModule],
    },
  );
  SwaggerModule.setup('api/file', app, document);
  SwaggerModule.setup('api/folder', app, folderSwaggerDocument);

  await app.listen(config.get('PORT'));
  logger.log(`Listening to port: ${config.get('PORT')}`);
}

bootstrap();
