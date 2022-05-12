import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FolderCrudModule } from './modules/folder-crud/folder.crud.module';
import { FileCrudModule } from './modules/file-crud/file.crud.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    FolderCrudModule,
    FileCrudModule,
    RouterModule.register([
      {
        path: 'folder',
        module: FolderCrudModule,
      },
      {
        path: 'file',
        module: FileCrudModule,
      },
    ]),
  ],
  controllers: [HealthController],
})
export class AppModule {}
