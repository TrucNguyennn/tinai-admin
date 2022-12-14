import { IResponse } from '@/@type/interface/response';
import authApi from '@/services/auth.api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const Login = createAsyncThunk(`admin/login`, async (data: ILogin) => {
  return await authApi.login(data);
});

export const getCurrentAdmin = createAsyncThunk(`admin/current`, async () => {
  return await authApi.getCurrentAdmin();
});

export const updateAdmin = createAsyncThunk(
  `admin/update`,
  async (data: FormData) => {
    return await authApi.updateAdmin(data);
  },
);

const initialValue: IAuth = {
  isLogin: false,
  admin: {
    id: ``,
    avatar: ``,
    email: ``,
    name: ``,
    username: ``,
  },
};

export const authSlice = createSlice({
  name: `auth`,
  initialState: initialValue,
  extraReducers: (builder) => {
    builder.addCase(
      Login.fulfilled,
      (state: IAuth, action: PayloadAction<IResponse<string>>) => {
        if (action.payload.status) {
          const res = action.payload;
          state.isLogin = true;
          localStorage.setItem(`token`, res.data);
        }
      },
    );
    builder.addCase(
      getCurrentAdmin.fulfilled,
      (state: IAuth, action: PayloadAction<IResponse<string | IAdmin>>) => {
        if (action.payload.status) {
          state.isLogin = true;
          const res = action.payload.data as IAdmin;

          state.admin = res;
        }
      },
    );
    builder.addCase(getCurrentAdmin.rejected, (state: IAuth) => {
      localStorage.removeItem(`token`);
      state.isLogin = false;
    });
    builder.addCase(
      updateAdmin.fulfilled,
      (state: IAuth, action: PayloadAction<IResponse<string | IAdmin>>) => {
        if (action.payload.status) {
          const res = action.payload.data as IAdmin;
          state.admin = res;
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
