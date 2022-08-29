import { IPagination, IResponse } from '@/@type/interface/response';
import usersApi from '@/services/users.api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getAllUsersBasic = createAsyncThunk(
  `admin/users`,
  async (data: IPageOption) => {
    return await usersApi.getAllBasicUser(data);
  },
);

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

export const deleteUser = createAsyncThunk(
  `admin/delete-user`,
  async (id: string) => {
    return await usersApi.deleteUser(id);
  },
);

const initialValue: IPagination<IUserBasic> = {
  list: [],
  page: 0,
  limit: 5,
  total: 0,
};

export const usersSlice = createSlice({
  name: `users`,
  initialState: initialValue,
  extraReducers(builder) {
    builder.addCase(
      getAllUsersBasic.fulfilled,
      (
        state: IPagination<IUserBasic>,
        action: PayloadAction<IResponse<IPagination<IUserBasic>>>,
      ) => {
        console.log(`action`, action);
        if (action.payload.status) {
          const res = action.payload.data as IPagination<IUserBasic>;
          state.list.splice(0, state.list.length);
          state.page = res.page;
          state.limit = res.limit;
          state.total = res.total;
          for (let i = 0; i < res.list.length; i++) {
            state.list.push({
              ...res.list[i],
              birthday: new Date(res.list[i].birthday),
            });
          }
        }
      },
    );
    builder.addCase(
      blockUser.fulfilled,
      (
        state: IPagination<IUserBasic>,
        action: PayloadAction<IResponse<string>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as string;
          const index = state.list.findIndex((item) => item.id === res);
          state.list[index].isBlock = true;
        }
      },
    );
    builder.addCase(
      unblockUser.fulfilled,
      (
        state: IPagination<IUserBasic>,
        action: PayloadAction<IResponse<string>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as string;
          const index = state.list.findIndex((item) => item.id === res);
          state.list[index].isBlock = false;
        }
      },
    );
    builder.addCase(
      deleteUser.fulfilled,
      (
        state: IPagination<IUserBasic>,
        action: PayloadAction<IResponse<string>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as string;
          const index = state.list.findIndex((item) => item.id === res);
          state.list.splice(index, 1);
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = usersSlice;
export const {} = actions;
export default reducer;
