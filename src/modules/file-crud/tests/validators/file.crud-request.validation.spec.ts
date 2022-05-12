import { Test } from '@nestjs/testing';
import { FileCrudRequestValidation } from '../../validators/file.crud-request.validation';
import { MutableFileFieldsEntity } from '../../entity/mutable-file-fields.entity';
import { BadRequestException } from '@nestjs/common';

describe('FileCrudRequestValidation', () => {
  let fileCrudRequestValidation: FileCrudRequestValidation;
  const validFile: MutableFileFieldsEntity = {
    name: 'mock_name',
    parentFolderId: 'mock_parent_folder_id',
    content: 'mock_content',
  };

  const inValidFile: Omit<MutableFileFieldsEntity, 'name'> = {
    parentFolderId: 'mock_parent_folder_id',
    content: 'mock_content',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FileCrudRequestValidation],
    }).compile();

    fileCrudRequestValidation = moduleRef.get(FileCrudRequestValidation);
  });

  it('should throw BadRequestException when calling create and the value is not valid', () => {
    expect(() => {
      fileCrudRequestValidation.create(inValidFile);
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when calling deleteById and the value is not string', () => {
    expect(() => {
      fileCrudRequestValidation.deleteById({});
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when calling getById and the value is not string', () => {
    expect(() => {
      fileCrudRequestValidation.getById({});
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when calling update and the value is not valid', () => {
    expect(() => {
      const notAString = 2;
      fileCrudRequestValidation.update({
        ...validFile,
        name: notAString,
      });
    }).toThrow(BadRequestException);
  });

  it('should not throw any exceptions when calling create and the value IS valid', () => {
    expect(() => {
      fileCrudRequestValidation.create(validFile);
    }).not.toThrow();
  });

  it('should not throw any exceptions when calling deleteById and the value is string', () => {
    expect(() => {
      fileCrudRequestValidation.deleteById('aString');
    }).not.toThrow();
  });

  it('should not throw any exceptions when calling getById and the value is string', () => {
    expect(() => {
      fileCrudRequestValidation.getById('aString');
    }).not.toThrow();
  });

  it('should not throw any exceptions when calling update and the value IS valid', () => {
    expect(() => {
      fileCrudRequestValidation.update(validFile);
    }).not.toThrow();
  });
});
