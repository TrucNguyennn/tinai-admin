import { Method } from '@/@type';
import { IResponse } from '@/@type/interface/response';
import axiosApiCall from '@/utils/api';

const purposeApi = {
  getAll: async (): Promise<IResponse<IPurpose[] | string>> => {
    const url = `purpose-settings`;
    return await axiosApiCall(url, Method.get);
  },
  update: async (
    dto: ICreateUpdatePurpose,
  ): Promise<IResponse<IPurpose | string>> => {
    const url = `purpose-settings/${dto.id}`;

    const data = new FormData();

    if (dto.title) {
      data.append(`title`, dto.title);
    }

    if (dto.description) {
      data.append(`description`, dto.description);
    }

    if (dto.file) {
      data.append(`file`, dto.file);
    }
    return await axiosApiCall(url, Method.put, data, true);
  },
  create: async (
    dto: ICreateUpdatePurpose,
  ): Promise<IResponse<IPurpose | string>> => {
    const url = `purpose-settings`;

    const data = new FormData();
    if (dto.title) {
      data.append(`title`, dto.title);
    }

    if (dto.description) {
      data.append(`description`, dto.description);
    }

    if (dto.file) {
      data.append(`file`, dto.file);
    }
    return await axiosApiCall(url, Method.post, data, true);
  },
  delete: async (id: string): Promise<IResponse<string>> => {
    const url = `purpose-settings/${id}`;
    return await axiosApiCall(url, Method.delete);
  },
};

export default purposeApi;
