import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  FileFindService,
  FindFilenameStartsWithQuery,
  FindFileQuery,
} from '../services/file.find.service';
import { FileQueryValidation } from '../validators/file.query.validation';
import { ApiResponseFactory } from '../../core/helpers/api.response.factory';
import { ApiBody } from '@nestjs/swagger';
import {
  FileFindRouteSchema,
  FileFindStartsWithRouteSchema,
} from '../swagger/fileFindRouteSchema';

@Controller()
export class FileFindController {
  constructor(
    private findService: FileFindService,
    private fileQueryValidation: FileQueryValidation,
    private apiResponseFactory: ApiResponseFactory,
  ) {}

  @ApiBody({ type: FileFindRouteSchema })
  @Get('find/')
  async findByFilename(@Query() whereQuery: FindFileQuery) {
    const validationResult = this.fileQueryValidation.find(whereQuery);

    if (validationResult.error) {
      throw new BadRequestException(validationResult.error);
    }

    return this.apiResponseFactory.response(
      await this.findService.find(
        {
          name: whereQuery.name,
          parentFolderId: whereQuery.parentFolderId,
        },
        validationResult.value.limit,
      ),
      HttpStatus.OK,
    );
  }

  @ApiBody({ type: FileFindStartsWithRouteSchema })
  @Get('find/starts-with/')
  async findByFilenameStartsWith(
    @Query() whereQuery: FindFilenameStartsWithQuery,
  ) {
    const validationResult =
      this.fileQueryValidation.findStartsWith(whereQuery);

    if (validationResult.error) {
      throw new BadRequestException(validationResult.error);
    }

    return this.apiResponseFactory.response(
      await this.findService.findByFilenameStartsWith(
        {
          name: whereQuery.name,
          parentFolderId: whereQuery.parentFolderId,
        },
        validationResult.value.limit,
      ),
      HttpStatus.OK,
    );
  }
}
