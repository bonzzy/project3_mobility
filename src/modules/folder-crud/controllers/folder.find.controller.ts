import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  FindFolderQuery,
  FolderFindService,
} from '../services/folder.find.service';
import { FolderQueryValidation } from '../validators/folder.query.validation';
import { ApiBody } from '@nestjs/swagger';
import { FolderFindRouteSchema } from '../swagger/fileFindRouteSchema';

@Controller()
export class FolderFindController {
  constructor(
    private findService: FolderFindService,
    private folderQueryValidation: FolderQueryValidation,
  ) {}

  @ApiBody({ type: FolderFindRouteSchema })
  @Get('find')
  private findByQuery(@Query() whereQuery: FindFolderQuery) {
    const validationResult = this.folderQueryValidation.find(whereQuery);

    if (validationResult.error) {
      throw new BadRequestException(validationResult.error);
    }

    return this.findService.find(whereQuery);
  }
}
