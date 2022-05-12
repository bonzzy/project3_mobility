import { CrudRequestValidation } from '../../crud/interfaces/crud-request.validation';
import * as Joi from 'joi';
import { BadRequestException } from '@nestjs/common';
import { MutableFolderFieldsEntity } from '../entity/mutable-folder-fields.entity';

export const createFolderSchema = Joi.object({
  name: Joi.string().required(),
  parentFolderId: Joi.string().optional(),
});

export class FolderCrudRequestValidation
  implements CrudRequestValidation<MutableFolderFieldsEntity | string>
{
  create(value): void {
    const validation = createFolderSchema.validate(value);

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
    const validation = createFolderSchema.validate(value);

    if (validation.error) {
      throw new BadRequestException(validation.error);
    }
  }
}
