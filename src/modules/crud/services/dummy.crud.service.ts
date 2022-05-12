import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CrudService } from '../interfaces/crud.service';
import { BaseCrudEntity } from '../interfaces/base.crud.entity';

interface Dummy {
  dummy: string;
}

@Injectable()
export class DummyCrudService implements CrudService<Dummy> {
  create(): Promise<Dummy & BaseCrudEntity> {
    throw new InternalServerErrorException(
      'Implement a real service and use CrudService as a token',
    );
  }

  deleteById(): Promise<boolean> {
    throw new InternalServerErrorException(
      'Implement a real service and use CrudService as a token',
    );
  }

  getById(): Promise<Dummy & BaseCrudEntity> {
    throw new InternalServerErrorException(
      'Implement a real service and use CrudService as a token',
    );
  }

  update(): Promise<Dummy & BaseCrudEntity> {
    throw new InternalServerErrorException(
      'Implement a real service and use CrudService as a token',
    );
  }
}
