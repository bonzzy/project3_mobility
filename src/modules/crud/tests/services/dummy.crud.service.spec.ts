import { DummyCrudService } from '../../services/dummy.crud.service';
import { Test } from '@nestjs/testing';

describe('DummyCrudService', () => {
  let dummyService: DummyCrudService;

  beforeAll(async () => {
    const refModule = await Test.createTestingModule({
      providers: [DummyCrudService],
    }).compile();

    dummyService = refModule.get(DummyCrudService);
  });

  it.each([
    [
      'create',
      () => {
        dummyService.create();
      },
    ],
    [
      'getById',
      () => {
        dummyService.getById();
      },
    ],
    [
      'update',
      () => {
        dummyService.update();
      },
    ],
    [
      'deleteById',
      () => {
        dummyService.deleteById();
      },
    ],
  ])('should throw an exception when %s is called', (name, method) => {
    expect(method).toThrow();
  });
});
