import { configureStore, Store } from '@reduxjs/toolkit';
import { env } from 'process';

import breedCheckerReducer from '../features/breed-checker/breed-checker-slice';
import { dogsApi } from '../features/gallery/dogs-api';

export const store = configureStore({
  devTools: env?.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([dogsApi.middleware]),
  reducer: {
    [dogsApi.reducerPath]: dogsApi.reducer,
    breedChecker: breedCheckerReducer,
  },
}) as Store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
