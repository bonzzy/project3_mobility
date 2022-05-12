import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../postgres-prisma/services/prisma.service';
import { File } from '@prisma/client';

export interface FindFileQuery {
  name?: string;
  parentFolderId?: string;
  limit?: number;
}

export interface FindFilenameStartsWithQuery {
  name: string;
  parentFolderId?: string;
  limit?: number;
}

@Injectable()
export class FileFindService {
  constructor(private prismaService: PrismaService) {}

  async find(whereQuery: FindFileQuery, limit = 10): Promise<File[]> {
    return this.prismaService.file.findMany({
      where: whereQuery,
      take: limit,
    });
  }

  async findByFilenameStartsWith(
    whereQuery: FindFilenameStartsWithQuery,
    limit = 10,
  ): Promise<File[]> {
    return this.prismaService.file.findMany({
      where: {
        ...whereQuery,
        name: {
          startsWith: whereQuery.name,
        },
      },
      take: limit,
    });
  }
}
