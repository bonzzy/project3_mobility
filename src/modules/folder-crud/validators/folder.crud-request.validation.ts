import * as Joi from 'joi';
import { BadRequestException } from '@nestjs/common';
import { CrudRequestValidation } from '../../../core/crud/interfaces/crud-request.validation';

export const createFolderSchema = Joi.object({
  name: Joi.string().required(),
  parentFolderId: Joi.string().optional(),
});

export class FolderCrudRequestValidation implements CrudRequestValidation {
  create(value: unknown): void {
    const validation = createFolderSchema.validate(value);

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
    const validation = createFolderSchema.validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }
}
