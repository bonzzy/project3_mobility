import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FolderFindRouteSchema {
  @ApiPropertyOptional()
  @ApiProperty()
  name?: string;
  @ApiPropertyOptional()
  @ApiProperty()
  parentFolderId?: string;

  @ApiPropertyOptional()
  @ApiProperty({
    default: 10,
    maximum: 10000,
  })
  limit?: number;
}
