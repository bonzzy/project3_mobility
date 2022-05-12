import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import { CoreModule } from '../../src/modules/core/core.module';
import { CrudController } from '../../src/modules/crud/controllers/crud.controller';
import { CrudService } from '../../src/modules/crud/interfaces/crud.service';
import { CrudRequestValidation } from '../../src/modules/crud/interfaces/crud-request.validation';
import { BaseCrudEntity } from '../../src/modules/crud/interfaces/base.crud.entity';
import { ApiResponseFactory } from '../../src/modules/core/helpers/api.response.factory';
import FunctionPropertyNames = jest.FunctionPropertyNames;

interface MockEntity {
  value: string;
}

describe('(DELETE) generic crud', function () {
  let app: INestApplication;
  let crudService: CrudService<MockEntity>;
  let crudRequestValidation: CrudRequestValidation<MockEntity>;
  let apiResponseFactory: ApiResponseFactory;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [CrudController],
      providers: [
        {
          provide: 'CrudService',
          useValue: {
            deleteById: jest.fn(),
          },
        },
        {
          provide: 'CrudRequestValidation',
          useValue: {
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    crudService = app.get<CrudService<MockEntity>>('CrudService');
    apiResponseFactory = app.get<ApiResponseFactory>(ApiResponseFactory);
    crudRequestValidation = app.get<CrudRequestValidation<MockEntity>>(
      'CrudRequestValidation',
    );
  });

  it('should return 204 with an empty response when the entity is deleted', () => {
    mockCrudServiceDeleteMethod(true);

    return request(app.getHttpServer())
      .delete(`/mock_id`)
      .expect(HttpStatus.NO_CONTENT)
      .expect('');
  });

  it('should return 404 when entity not found', () => {
    mockCrudServiceDeleteMethod(false);

    return request(app.getHttpServer())
      .delete(`/`)
      .expect(HttpStatus.NOT_FOUND);
  });

  function mockCrudServiceDeleteMethod(isTrue: boolean) {
    jest.spyOn(crudService, 'deleteById').mockImplementation(() => {
      return Promise.resolve(isTrue);
    });
  }
});
