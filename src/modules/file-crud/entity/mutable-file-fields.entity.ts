import { File } from '@prisma/client';
import { BaseCrudEntity } from '../../../core/crud/interfaces/base.crud.entity';

export type MutableFileFieldsEntity = Omit<File, keyof BaseCrudEntity>;
