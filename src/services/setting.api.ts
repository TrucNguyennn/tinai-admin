import { Method } from '@/@type';
import { IResponse } from '@/@type/interface/response';
import axiosApiCall from '@/utils/api';

const settingApi = {
  getSetting: async (): Promise<IResponse<string | ISetting>> => {
    const url = `secure/settings`;
    return await axiosApiCall(url, Method.get);
  },
  updateSetting: async (
    radius: number,
  ): Promise<IResponse<string | ISetting>> => {
    const url = `secure/settings`;
    return await axiosApiCall(url, Method.put, {
      radius: radius,
    });
  },
};

export default settingApi;
