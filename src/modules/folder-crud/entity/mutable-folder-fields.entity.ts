import { Folder } from '@prisma/client';
import { BaseCrudEntity } from '../../crud/interfaces/base.crud.entity';

export type MutableFolderFieldsEntity = Omit<Folder, keyof BaseCrudEntity>;
