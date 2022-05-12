import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CoreModule } from '../../src/modules/core/core.module';
import { ApiResponseFactory } from '../../src/modules/core/helpers/api.response.factory';
import FunctionPropertyNames = jest.FunctionPropertyNames;
import { CrudService } from '../../src/core/crud/interfaces/crud.service';
import { CrudController } from '../../src/core/crud/controllers/crud.controller';
import { BaseCrudEntity } from '../../src/core/crud/interfaces/base.crud.entity';

interface MockEntity {
  value: string;
}

describe('(GET) generic crud', function () {
  let app: INestApplication;
  let crudService: CrudService<MockEntity>;
  let apiResponseFactory: ApiResponseFactory;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [CrudController],
      providers: [
        {
          provide: 'CrudService',
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: 'CrudRequestValidation',
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    crudService = app.get<CrudService<MockEntity>>('CrudService');
    apiResponseFactory = app.get<ApiResponseFactory>(ApiResponseFactory);
  });

  it('should return 200 with the correct response format when the entity found', () => {
    const crudServiceResponse: MockEntity & BaseCrudEntity = getValidResponse();

    mockCrudServiceMethod(crudServiceResponse, 'getById');

    return request(app.getHttpServer())
      .get(`/mock_id`)
      .expect(HttpStatus.OK)
      .expect(
        JSON.stringify(
          apiResponseFactory.response(crudServiceResponse, HttpStatus.OK),
        ),
      );
  });

  it('should return 404 when the entity not found', () => {
    mockCrudServiceMethod(undefined, 'getById');

    return request(app.getHttpServer())
      .get(`/mock_id`)
      .expect(HttpStatus.NOT_FOUND);
  });

  function mockCrudServiceMethod(
    entity: MockEntity & BaseCrudEntity,
    method: FunctionPropertyNames<Required<CrudService<MockEntity>>>,
  ) {
    jest.spyOn(crudService, method).mockImplementation(() => {
      return Promise.resolve(entity);
    });
  }

  function getValidResponse(): MockEntity & BaseCrudEntity {
    return {
      id: 'mock_id',
      value: 'mock_value',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
});
