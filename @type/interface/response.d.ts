export interface IResponse {
  status: boolean;
  error?: error;
  data: T | T[] | string | Array | object;
  message?: null;
}
