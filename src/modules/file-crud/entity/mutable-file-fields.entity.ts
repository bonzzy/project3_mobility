import { BaseCrudEntity } from '../../crud/interfaces/base.crud.entity';
import { File } from '@prisma/client';

export type MutableFileFieldsEntity = Omit<File, keyof BaseCrudEntity>;
