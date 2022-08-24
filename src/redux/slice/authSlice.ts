import { IResponse } from '@/@type/interface/response';
import authApi from '@/services/auth.api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const Login = createAsyncThunk(`admin/login`, async (data: ILogin) => {
  return await authApi.login(data);
});

const initialValue: IAuth = {
  isLogin: false,
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
  },
  reducers: {},
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
