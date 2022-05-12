import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import { FindFolderQuery } from '../services/folder.find.service';

export const findQuerySchema = Joi.object({
  name: Joi.string().optional(),
  parentFolderId: Joi.string().optional(),
  limit: Joi.number().max(10000).optional().default(10),
});

@Injectable()
export class FolderQueryValidation {
  find(value: FindFolderQuery) {
    return findQuerySchema.validate(value);
  }
}
