export interface IResponse<T> {
  status: boolean;
  error_code?: error;
  data: T | T[] | string | Array | object;
  message?: null;
}
