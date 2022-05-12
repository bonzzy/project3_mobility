import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CoreModule } from '../../src/modules/core/core.module';
import { CrudService } from '../../src/core/crud/interfaces/crud.service';
import { CrudController } from '../../src/core/crud/controllers/crud.controller';

interface MockEntity {
  value: string;
}

describe('(DELETE) generic crud', function () {
  let app: INestApplication;
  let crudService: CrudService<MockEntity>;

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
