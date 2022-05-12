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

describe('(POST) generic crud', function () {
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
            create: jest.fn(),
          },
        },
        {
          provide: 'CrudRequestValidation',
          useValue: {
            create: jest.fn(),
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

  it('should return 201 with the correct response format when the payload is valid', () => {
    const validPayload = getValidCreatePayload();
    const crudServiceResponse: MockEntity & BaseCrudEntity = {
      ...getValidCreateResponse(),
      value: validPayload.value,
    };

    mockCrudServiceMethod(crudServiceResponse, 'create');

    return request(app.getHttpServer())
      .post(`/`)
      .send(validPayload)
      .expect(HttpStatus.CREATED)
      .expect(
        JSON.stringify(
          apiResponseFactory.response(crudServiceResponse, HttpStatus.CREATED),
        ),
      );
  });

  it('should return 400 when the validation throws BadRequest', () => {
    const validPayload = getValidCreatePayload();
    const crudServiceResponse: MockEntity & BaseCrudEntity = {
      ...getValidCreateResponse(),
      value: validPayload.value,
    };

    mockCrudServiceMethod(crudServiceResponse, 'create');
    mockCreateValidationBadRequest('create');

    return request(app.getHttpServer())
      .post(`/`)
      .send()
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

  function mockCreateValidationBadRequest(
    method: FunctionPropertyNames<Required<CrudService<MockEntity>>>,
  ) {
    jest.spyOn(crudRequestValidation, method).mockImplementation(() => {
      throw new BadRequestException();
    });
  }

  function getValidCreateResponse(): MockEntity & BaseCrudEntity {
    return {
      id: 'mock_id',
      value: 'mock_value',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }

  function getValidCreatePayload(): MockEntity {
    return {
      value: 'mock_value',
    };
  }
});
