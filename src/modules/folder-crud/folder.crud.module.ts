import { Module } from '@nestjs/common';
import { CrudController } from '../crud/controllers/crud.controller';
import { FolderCrudService } from './services/folder.crud.service';
import { PostgresPrismaModule } from '../postgres-prisma/postgres.prisma.module';
import { FolderCrudRequestValidation } from './validators/folder.crud-request.validation';
import { FolderFindController } from './controllers/folder.find.controller';
import { FolderFindService } from './services/folder.find.service';
import { CoreModule } from '../core/core.module';
import { FolderQueryValidation } from './validators/folder.query.validation';
import { CrudModule } from '../crud/crud.module';

@Module({
  imports: [PostgresPrismaModule, CoreModule, CrudModule],
  controllers: [FolderFindController],
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
