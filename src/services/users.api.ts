import { Method } from '@/@type';
import { IResponse } from '@/@type/interface/response';
import axiosApiCall from '@/utils/api';

const usersApi = {
  getAllBasicUser: async (): Promise<IResponse<IUserBasic[]>> => {
    const url = `secure/users/get-all`;
    return await axiosApiCall(url, Method.get);
  },
  getUserDetail: async (
    id: string,
  ): Promise<IResponse<string | IUserDetail>> => {
    const url = `secure/users/get-detail/${id}`;
    return await axiosApiCall(url, Method.get);
  },
  blockUser: async (id: string): Promise<IResponse<string>> => {
    const url = `secure/users/block/${id}`;
    return await axiosApiCall(url, Method.post);
  },
  unblockUser: async (id: string): Promise<IResponse<string>> => {
    const url = `secure/users/unblock/${id}`;
    return await axiosApiCall(url, Method.post);
  },
};

export default usersApi;
