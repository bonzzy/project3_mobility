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

describe('(PUT) generic crud', function () {
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
            update: jest.fn(),
          },
        },
        {
          provide: 'CrudRequestValidation',
          useValue: {
            update: jest.fn(),
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

  it('should return 200 with the correct response format when the payload is valid', () => {
    const crudServiceResponse: MockEntity & BaseCrudEntity = getValidEntity();

    mockCrudServiceMethod(crudServiceResponse, 'update');

    return request(app.getHttpServer())
      .put(`/mock_id`)
      .expect(HttpStatus.OK)
      .expect(
        JSON.stringify(
          apiResponseFactory.response(crudServiceResponse, HttpStatus.OK),
        ),
      );
  });

  it('should return 400 when the validation throws BadRequest', () => {
    const crudServiceResponse: MockEntity & BaseCrudEntity = getValidEntity();

    mockCrudServiceMethod(crudServiceResponse, 'update');
    mockValidationBadRequest('update');

    return request(app.getHttpServer())
      .put(`/mock_id`)
      .expect(HttpStatus.BAD_REQUEST);
  });

  function mockCrudServiceMethod(
    entity: MockEntity & BaseCrudEntity,
    method: FunctionPropertyNames<Required<CrudService<MockEntity>>>,
  ) {
    jest.spyOn(crudService, method).mockImplementation(() => {
      return Promise.resolve(entity);
    });
  }

  function mockValidationBadRequest(
    method: FunctionPropertyNames<Required<CrudService<MockEntity>>>,
  ) {
    jest.spyOn(crudRequestValidation, method).mockImplementation(() => {
      throw new BadRequestException();
    });
  }

  function getValidEntity(): MockEntity & BaseCrudEntity {
    return {
      id: 'mock_id',
      value: 'mock_value',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
});
