import { IResponse } from '@/@type/interface/response';
import { Method } from '../@type/enum';
import axiosApiCall from '../utils/api';

const authApi = {
  login: async (data: ILogin): Promise<IResponse<string>> => {
    const url = `secure/auth/admin/login`;
    return await axiosApiCall(url, Method.post, data);
  },
};

export default authApi;
