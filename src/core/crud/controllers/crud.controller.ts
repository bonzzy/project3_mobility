import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CrudService } from '../interfaces/crud.service';
import { CrudRequestValidation } from '../interfaces/crud-request.validation';
import { ApiResponseFactory } from '../../../modules/core/helpers/api.response.factory';

@Controller()
export class CrudController<T> {
  constructor(
    @Inject('CrudService') private crudService: CrudService<T>,
    @Inject('CrudRequestValidation')
    private crudRequestValidation: CrudRequestValidation,
    private apiResponseFactory: ApiResponseFactory,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    this.crudRequestValidation.getById(id);
    const foundEntity = await this.crudService.getById(id);
    if (!foundEntity) {
      throw new NotFoundException('Entity not found');
    }

    return this.apiResponseFactory.response(foundEntity, HttpStatus.OK);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNew(@Body() entity: T) {
    this.crudRequestValidation.create(entity);
    return this.apiResponseFactory.response(
      await this.crudService.create(entity),
      HttpStatus.CREATED,
    );
  }

  @Put(':id')
  async update(@Body() entity: T, @Param('id') id: string) {
    this.crudRequestValidation.update(entity);
    return this.apiResponseFactory.response(
      await this.crudService.update(id, entity),
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    this.crudRequestValidation.deleteById(id);
  }
}
