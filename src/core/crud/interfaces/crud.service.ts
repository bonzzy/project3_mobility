import { BaseCrudEntity } from './base.crud.entity';

export interface CrudService<T> {
  getById(id: string): Promise<T & BaseCrudEntity>;

  create(entity: T): Promise<T & BaseCrudEntity>;

  update(id: string, entity: Partial<T>): Promise<T & BaseCrudEntity>;

  deleteById(id: string): Promise<boolean>;
}
