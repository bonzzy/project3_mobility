import { Module } from '@nestjs/common';
import { CrudController } from './controllers/crud.controller';

@Module({
  controllers: [CrudController],
  providers: []
})
export class CrudModule {}
