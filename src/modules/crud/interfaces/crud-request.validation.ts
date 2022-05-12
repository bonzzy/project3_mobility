export interface CrudRequestValidation<T> {
  getById(value): void;

  update(value): void;

  create(value): void;

  deleteById(value): void;
}
