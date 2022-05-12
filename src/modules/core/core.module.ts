import { Module } from '@nestjs/common';
import { ApiResponseFactory } from './helpers/api.response.factory';

@Module({
  imports: [],
  providers: [ApiResponseFactory],
  exports: [ApiResponseFactory],
})
export class CoreModule {}
