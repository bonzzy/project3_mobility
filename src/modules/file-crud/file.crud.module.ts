import { Module } from '@nestjs/common';
import { CrudController } from '../crud/controllers/crud.controller';
import { FileCrudService } from './services/file.crud.service';
import { PostgresPrismaModule } from '../postgres-prisma/postgres.prisma.module';
import { FileCrudRequestValidation } from './validators/file.crud-request.validation';
import { FileFindService } from './services/file.find.service';
import { FileFindController } from './controllers/file.find.controller';
import { CoreModule } from '../core/core.module';
import { FileQueryValidation } from './validators/file.query.validation';
import { ApiResponseFactory } from '../core/helpers/api.response.factory';

@Module({
  imports: [PostgresPrismaModule, CoreModule],
  controllers: [FileFindController, CrudController],
  providers: [
    {
      provide: 'CrudService',
      useClass: FileCrudService,
    },
    {
      provide: 'CrudRequestValidation',
      useClass: FileCrudRequestValidation,
    },
    FileFindService,
    FileQueryValidation,
    ApiResponseFactory,
  ],
})
export class FileCrudModule {}
