import * as Joi from 'joi';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CrudRequestValidation } from '../../../core/crud/interfaces/crud-request.validation';

export const createFileSchema = Joi.object({
  name: Joi.string().required(),
  content: Joi.string().required(),
  parentFolderId: Joi.string().required(),
});

export const updateFileSchema = Joi.object({
  name: Joi.string().optional(),
  content: Joi.string().optional(),
  parentFolderId: Joi.string().optional(),
});

@Injectable()
export class FileCrudRequestValidation implements CrudRequestValidation {
  create(value: unknown): void {
    const validation = createFileSchema.validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }

  deleteById(value: unknown): void {
    const validation = Joi.string().validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }

  getById(value: unknown): void {
    const validation = Joi.string().validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }

  update(value: unknown): void {
    const validation = updateFileSchema.validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }
}
