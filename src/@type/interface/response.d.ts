export interface IResponse<T> {
  status: boolean;
  error?: error;
  data: T | T[] | string | Array | object;
  message?: null;
}
