import { ValidationFormDTO } from '../dto/validation.dto';

export interface IBaseService<T> {
  _countDocuments(condition: any): Promise<any>;

  _findById(id: any, populates: any[]): Promise<T>;

  _findAll(query: any, condition: any, populates: any[]): Promise<T[]>;

  _findALlIds(query: any, condition: any): Promise<any>;

  _findALlIdsByField(condition: any, field_name: string): Promise<any>;

  _find(condition: any, populates: any[]): Promise<any>;

  _findOne(condition: any, populates: any[]): Promise<any>;

  _findIndex(condition: any): Promise<any>;

  _findByIdAndUpdate(
    id: any,
    data: any,
    options: any,
    populates: any[],
  ): Promise<any>;

  _findOneAndUpdate(condition: string, data: any, options: any): Promise<T>;

  _aggregate(aggregate: any): Promise<any>;

  _getAll(query: any, condition: any): Promise<any>;

  _delete(id: any): Promise<T>;

  _deleteMany(condition: any): Promise<any>;

  _create(data: any, options: any): Promise<T | any>;

  _createIndexes(): void;

  _updateStatus(id: any, data: any, options: any): Promise<any>;

  _updateOne(condition: any, data: any, options: any): Promise<any>;

  _updateMany(condition: any, payload: any): Promise<any>;

  _insertMany(condition: any): Promise<any>;
}
