import { IResponse } from '@/@type/interface/response';
import settingApi from '@/services/setting.api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getSetting = createAsyncThunk(`admin/settings`, async () => {
  return settingApi.getSetting();
});
export const updateSetting = createAsyncThunk(
  `admin/update-setting`,
  async (radius: number) => {
    return settingApi.updateSetting(radius);
  },
);

const initialValue: ISetting = {
  id: ``,
  createdAt: ``,
  radius: 0,
  updatedAt: ``,
};

export const settingSlice = createSlice({
  name: `setting`,
  initialState: initialValue,
  extraReducers(builder) {
    builder.addCase(
      getSetting.fulfilled,
      (
        state: ISetting,
        action: PayloadAction<IResponse<string | ISetting>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as ISetting;
          state.id = res.id;
          state.createdAt = res.createdAt;
          state.radius = res.radius;
          state.updatedAt = res.updatedAt;
        }
      },
    );
    builder.addCase(
      updateSetting.fulfilled,
      (
        state: ISetting,
        action: PayloadAction<IResponse<string | ISetting>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as ISetting;
          state.id = res.id;
          state.radius = res.radius;
          state.updatedAt = res.updatedAt;
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = settingSlice;
export const {} = actions;
export default reducer;
