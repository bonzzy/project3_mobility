import { PrismaService } from '../../postgres-prisma/services/prisma.service';
import { Folder } from '@prisma/client';
import { Injectable } from '@nestjs/common';

export interface FindFolderQuery {
  name?: string;
  parentFolderId?: string;
  limit?: number;
}

@Injectable()
export class FolderFindService {
  constructor(private prismaService: PrismaService) {}

  async find(whereQuery: FindFolderQuery, limit = 10): Promise<Folder[]> {
    return this.prismaService.folder.findMany({
      where: {
        ...whereQuery,
        parentFolderId: whereQuery.parentFolderId
          ? whereQuery.parentFolderId
          : null,
      },
      take: limit,
    });
  }
}
