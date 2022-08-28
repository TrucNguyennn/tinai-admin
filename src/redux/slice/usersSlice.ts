import { IResponse } from '@/@type/interface/response';
import usersApi from '@/services/users.api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetIsLogin } from './authSlice';

export const getAllUsersBasic = createAsyncThunk(`admin/users`, async () => {
  return await usersApi.getAllBasicUser();
});

export const getuserDetail = createAsyncThunk(
  `admin/users/detail`,
  async (id: string) => {
    return await usersApi.getUserDetail(id);
  },
);

export const blockUser = createAsyncThunk(
  `admin/users/block`,
  async (id: string) => {
    return await usersApi.blockUser(id);
  },
);

export const unblockUser = createAsyncThunk(
  `admin/users/unblock`,
  async (id: string) => {
    return await usersApi.unblockUser(id);
  },
);

const initialValue: IUserBasic[] = [];

export const usersSlice = createSlice({
  name: `users`,
  initialState: initialValue,
  extraReducers(builder) {
    builder.addCase(
      getAllUsersBasic.fulfilled,
      (state: IUserBasic[], action: PayloadAction<IResponse<IUserBasic[]>>) => {
        console.log(`action`, action);
        if (action.payload.status) {
          const res = action.payload.data as IUserBasic[];
          for (let i = 0; i < res.length; i++) {
            state.push({
              ...res[i],
              birthday: new Date(res[i].birthday),
            });
          }
        }
      },
    );
    builder.addCase(
      blockUser.fulfilled,
      (state: IUserBasic[], action: PayloadAction<IResponse<string>>) => {
        if (action.payload.status) {
          const res = action.payload.data as string;
          const index = state.findIndex((item) => item.id === res);
          state[index].isBlock = true;
        }
      },
    );
    builder.addCase(
      unblockUser.fulfilled,
      (state: IUserBasic[], action: PayloadAction<IResponse<string>>) => {
        if (action.payload.status) {
          const res = action.payload.data as string;
          const index = state.findIndex((item) => item.id === res);
          state[index].isBlock = false;
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = usersSlice;
export const {} = actions;
export default reducer;
