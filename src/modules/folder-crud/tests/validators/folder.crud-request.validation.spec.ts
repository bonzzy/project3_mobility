import { FileCrudRequestValidation } from '../../../file-crud/validators/file.crud-request.validation';
import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { FolderCrudRequestValidation } from '../../validators/folder.crud-request.validation';
import { MutableFolderFieldsEntity } from '../../entity/mutable-folder-fields.entity';

describe('FolderCrudRequestValidation', () => {
  let folderCrudRequestValidation: FileCrudRequestValidation;
  const validFolder: MutableFolderFieldsEntity = {
    name: 'mock_name',
    parentFolderId: 'mock_parent_folder_id',
  };

  const invalidFolder: Omit<MutableFolderFieldsEntity, 'name'> = {
    parentFolderId: 'mock_parent_folder_id',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FolderCrudRequestValidation],
    }).compile();

    folderCrudRequestValidation = moduleRef.get(FolderCrudRequestValidation);
  });

  it('should throw BadRequestException when calling create and the value is not valid', () => {
    expect(() => {
      folderCrudRequestValidation.create(invalidFolder);
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when calling deleteById and the value is not string', () => {
    expect(() => {
      folderCrudRequestValidation.deleteById({});
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when calling getById and the value is not string', () => {
    expect(() => {
      folderCrudRequestValidation.getById({});
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when calling update and the value is not valid', () => {
    expect(() => {
      const notAString = 2;
      folderCrudRequestValidation.update({
        ...validFolder,
        name: notAString,
      });
    }).toThrow(BadRequestException);
  });

  it('should not throw any exceptions when calling create and the value IS valid', () => {
    expect(() => {
      folderCrudRequestValidation.create(validFolder);
    }).not.toThrow();
  });

  it('should not throw any exceptions when calling deleteById and the value is string', () => {
    expect(() => {
      folderCrudRequestValidation.deleteById('aString');
    }).not.toThrow();
  });

  it('should not throw any exceptions when calling getById and the value is string', () => {
    expect(() => {
      folderCrudRequestValidation.getById('aString');
    }).not.toThrow();
  });

  it('should not throw any exceptions when calling update and the value IS valid', () => {
    expect(() => {
      folderCrudRequestValidation.update(validFolder);
    }).not.toThrow();
  });
});
