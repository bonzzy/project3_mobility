import { Module } from '@nestjs/common';
import { FolderCrudService } from './services/folder.crud.service';
import { PostgresPrismaModule } from '../postgres-prisma/postgres.prisma.module';
import { FolderCrudRequestValidation } from './validators/folder.crud-request.validation';
import { FolderFindController } from './controllers/folder.find.controller';
import { FolderFindService } from './services/folder.find.service';
import { CoreModule } from '../core/core.module';
import { FolderQueryValidation } from './validators/folder.query.validation';
import { CrudController } from '../../core/crud/controllers/crud.controller';

@Module({
  imports: [PostgresPrismaModule, CoreModule],
  controllers: [FolderFindController, CrudController],
  providers: [
    {
      provide: 'CrudService',
      useClass: FolderCrudService,
    },
    {
      provide: 'CrudRequestValidation',
      useClass: FolderCrudRequestValidation,
    },
    FolderFindService,
    FolderQueryValidation,
  ],
})
export class FolderCrudModule {}
