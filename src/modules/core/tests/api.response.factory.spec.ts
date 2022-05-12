import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseFactory } from '../helpers/api.response.factory';

export interface TestResponseData {
  fieldA: string;
}

describe('ApiResponseFactory', function () {
  let apiResponseFactory: ApiResponseFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ApiResponseFactory],
    }).compile();

    apiResponseFactory = await moduleRef.resolve(ApiResponseFactory);
  });

  it('should return the correct payload', () => {
    const givenData: TestResponseData = { fieldA: 'test_string' };
    const givenStatus = HttpStatus.CREATED;
    const actual = apiResponseFactory.response(givenData, givenStatus);
    const expected = {
      data: givenData,
      statusCode: givenStatus,
    };

    expect(actual).toEqual(expected);
  });
});
