import { IResponse } from '@/@type/interface/response';
import axios, { AxiosRequestConfig } from 'axios';
import getItemLocalStorage from './storage';

const http = axios.create({
  headers: {
    'Content-type': `application/json;charset=UTF-8`,
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMmE0ZmExZS04OTc0LTQ2YWMtOTJlNy1kZTc5MmViZWNjNDIiLCJwaG9uZSI6IjA5ODc2NTQzMjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MDg4MDI5MywiZXhwIjoxNjYwOTY2NjkzfQ.vr7U_ylKno6ONITNWEtat7SCLAEseWO0dIJANLH1zIo`,
  },
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const { url } = config;
    config.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

    if (config.headers === undefined) {
      config.headers = {};
    } else if (url?.includes(`secure`)) {
      const token: string | undefined = getItemLocalStorage(`token`);
      config.headers.Authorization = token ? `Bearer ${token}` : ``;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return {
      status: false,
      error: error,
      data: null,
      message: null,
    } as IResponse;
  },
);

http.interceptors.response.use(
  function (response) {
    return response.data as IResponse;
  },

  function (error) {
    return {
      status: false,
      error_code: error,
      data: null,
      message: null,
    } as IResponse;
  },
);

const axiosApiCall = async <T = any>(
  url: string,
  method: string,
  body = {},
  isFormData?: boolean,
): Promise<IResponse> => {
  if (isFormData) {
    return http.request<T, IResponse>({
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
      data: body,
      headers: {
        'Content-type': ` multipart/form-data`,
      },
    });
  }
  return http.request<T, IResponse>({
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    data: body,
  });
};

export default axiosApiCall;
