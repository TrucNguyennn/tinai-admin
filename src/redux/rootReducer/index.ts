import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from '../slice/authSlice';
import purposeSlice from '../slice/purposeSlice';
import settingSlice from '../slice/settingSlice';
import usersSlice from '../slice/usersSlice';

const persistConfig = {
  key: `root`,
  storage,
  whitelist: [``],
};
const rootReducer = combineReducers({
  authSlice,
  usersSlice,
  purposeSlice,
  settingSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
