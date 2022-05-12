import { Injectable } from '@nestjs/common';
import { CrudService } from '../../crud/interfaces/crud.service';
import { MutableFolderFieldsEntity } from '../entity/mutable-folder-fields.entity';
import { PrismaService } from '../../postgres-prisma/services/prisma.service';
import { Folder } from '@prisma/client';

@Injectable()
export class FolderCrudService
  implements CrudService<MutableFolderFieldsEntity>
{
  constructor(private prismaService: PrismaService) {}

  create(entity: MutableFolderFieldsEntity): Promise<Folder> {
    return this.prismaService.folder.create({
      data: entity,
    });
  }

  getById(id: string): Promise<Folder> {
    return this.prismaService.folder.findUnique({
      where: {
        id,
      },
    });
  }

  update(
    id: string,
    entity: Partial<MutableFolderFieldsEntity>,
  ): Promise<Folder> {
    return this.prismaService.folder.update({
      where: {
        id,
      },
      data: entity,
    });
  }

  async deleteById(id: string): Promise<boolean> {
    const deletedFolder: Folder = await this.prismaService.folder.delete({
      where: {
        id,
      },
    });
    return deletedFolder !== undefined;
  }
}
