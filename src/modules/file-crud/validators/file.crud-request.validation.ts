import { CrudRequestValidation } from '../../crud/interfaces/crud-request.validation';
import { MutableFileFieldsEntity } from '../entity/mutable-file-fields.entity';
import * as Joi from 'joi';
import { BadRequestException, Injectable } from '@nestjs/common';

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
export class FileCrudRequestValidation
  implements CrudRequestValidation<MutableFileFieldsEntity | string>
{
  create(value): void {
    const validation = createFileSchema.validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }

  deleteById(value): void {
    const validation = Joi.string().validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }

  getById(value): void {
    const validation = Joi.string().validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }

  update(value): void {
    const validation = updateFileSchema.validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }
}
