import { Method } from '../@type/enum';
import { IResponse } from '../@type/interface/response';
import axiosApiCall from '../utils/api';

export const register = async (data: any): Promise<IResponse> => {
  return await axiosApiCall(`users/signup`, Method.post, data);
};
export const doingSomething = async (data: any): Promise<IResponse> => {
  return await axiosApiCall(`users/signup`, Method.post, data);
};
