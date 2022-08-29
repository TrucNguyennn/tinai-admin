export interface IResponse<T> {
  status: boolean;
  error_code?: error;
  data: T | T[] | string | Array | object;
  message?: null;
}

export interface IPagination<T> {
  list: T[];
  total: number;
  limit: number;
  page: number;
}
