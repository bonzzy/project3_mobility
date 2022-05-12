import { HttpStatus, Injectable } from '@nestjs/common';

export interface ApiResponse<T> {
  data: T;
  statusCode: HttpStatus;
}

@Injectable()
export class ApiResponseFactory {
  public response<T>(
    body: T,
    httpStatus: HttpStatus = HttpStatus.OK,
  ): ApiResponse<T> {
    return {
      data: body,
      statusCode: httpStatus,
    };
  }
}
