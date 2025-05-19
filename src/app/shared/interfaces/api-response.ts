import { PaginationMetadata } from './pagination-metadata';

export interface ApiResponse<T> extends PaginationMetadata {
  data: T[];
}
