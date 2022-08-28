import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from '../slice/authSlice';
import purposeSlice from '../slice/purposeSlice';
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
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
