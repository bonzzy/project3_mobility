import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CrudService } from '../../crud/interfaces/crud.service';
import { MutableFileFieldsEntity } from '../entity/mutable-file-fields.entity';
import { PrismaService } from '../../postgres-prisma/services/prisma.service';
import { File, Prisma } from '@prisma/client';

@Injectable()
export class FileCrudService implements CrudService<MutableFileFieldsEntity> {
  constructor(private prismaService: PrismaService) {}

  async create(entity: MutableFileFieldsEntity): Promise<File> {
    try {
      return await this.prismaService.file.create({
        data: entity,
      });
    } catch (e) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference#p2003
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2003'
      ) {
        throw new NotFoundException('Folder not found');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  getById(id: string): Promise<File> {
    return this.prismaService.file.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    entity: Partial<MutableFileFieldsEntity>,
  ): Promise<File> {
    try {
      return await this.prismaService.file.update({
        where: {
          id,
        },
        data: entity,
      });
    } catch (e) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference#p2003
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2003'
      ) {
        throw new NotFoundException('Folder not found');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteById(id: string): Promise<boolean> {
    const deletedFolder: File = await this.prismaService.file.delete({
      where: {
        id,
      },
    });
    return deletedFolder !== undefined;
  }
}
