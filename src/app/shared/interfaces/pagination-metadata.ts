export interface PaginationMetadata {
  items: number;
  pages: number;
  first: number;
  last: number;
  next: number | null;
  prev: number | null;
}
