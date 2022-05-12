import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import {
  FindFilenameStartsWithQuery,
  FindFileQuery,
} from '../services/file.find.service';

export const findQuerySchema = Joi.object({
  name: Joi.string().optional(),
  parentFolderId: Joi.string().optional(),
  limit: Joi.number().max(10000).optional().default(10),
});

export const findStartsWithNameSchema = Joi.object({
  name: Joi.string().required(),
  parentFolderId: Joi.string().optional(),
  limit: Joi.number().max(10000).optional().default(10),
});

@Injectable()
export class FileQueryValidation {
  find(value: FindFileQuery) {
    return findQuerySchema.validate(value);
  }

  findStartsWith(value: FindFilenameStartsWithQuery) {
    return findStartsWithNameSchema.validate(value);
  }
}
