import { IResponse } from '@/@type/interface/response';
import purposeApi from '@/services/purpose.api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getAll = createAsyncThunk(`admin/purposes`, async () => {
  return await purposeApi.getAll();
});
export const updatePurpose = createAsyncThunk(
  `admin/edit-purpose`,
  async (dto: ICreateUpdatePurpose) => {
    return await purposeApi.update(dto);
  },
);
export const createPurpose = createAsyncThunk(
  `admin/create-purpose`,
  async (dto: ICreateUpdatePurpose) => {
    return await purposeApi.create(dto);
  },
);
export const deletePurpose = createAsyncThunk(
  `admin/delete-purpose`,
  async (id: string) => {
    return await purposeApi.delete(id);
  },
);

const initialValue: IPurpose[] = [];

export const purposeSlice = createSlice({
  name: `purpose`,
  initialState: initialValue,
  extraReducers(builder) {
    builder.addCase(
      getAll.fulfilled,
      (
        state: IPurpose[],
        action: PayloadAction<IResponse<string | IPurpose[]>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as IPurpose[];
          for (let i = 0; i < res.length; i++) {
            state.push(res[i]);
          }
        }
      },
    );
    builder.addCase(
      updatePurpose.fulfilled,
      (
        state: IPurpose[],
        action: PayloadAction<IResponse<string | IPurpose>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as IPurpose;
          const index = state.findIndex((item) => item.id === res.id);

          state[index] = { ...state[index], ...res };
        }
      },
    );
    builder.addCase(
      createPurpose.fulfilled,
      (
        state: IPurpose[],
        action: PayloadAction<IResponse<string | IPurpose>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as IPurpose;
          state.push(res);
        }
      },
    );
    builder.addCase(
      deletePurpose.fulfilled,
      (state: IPurpose[], action: PayloadAction<IResponse<string>>) => {
        if (action.payload.status) {
          const res = action.payload.data as string;
          const index = state.findIndex((item) => item.id === res);

          state.splice(index, 1);
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = purposeSlice;
export const {} = actions;
export default reducer;
