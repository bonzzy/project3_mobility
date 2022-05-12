export interface CrudRequestValidation {
  getById(value: unknown): void;

  update(value: unknown): void;

  create(value: unknown): void;

  deleteById(value: unknown): void;
}
