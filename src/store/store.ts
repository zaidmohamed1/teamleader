import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      student: studentReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
