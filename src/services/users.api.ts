import { Method } from '@/@type';
import { IPagination, IResponse } from '@/@type/interface/response';
import axiosApiCall from '@/utils/api';

const usersApi = {
  getAllBasicUser: async (
    dto: IPageOption,
  ): Promise<IResponse<IPagination<IUserBasic>>> => {
    const url = `secure/users/get-all?page=${dto.page}&limit=${dto.limit}`;
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
  deleteUser: async (id: string): Promise<IResponse<string>> => {
    const url = `secure/users/${id}`;
    return await axiosApiCall(url, Method.delete);
  },
};

export default usersApi;
