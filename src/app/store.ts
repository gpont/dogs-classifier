import { configureStore, Store } from '@reduxjs/toolkit';

import breedCheckerReducer from '../features/breed-checker/breed-checker-slice';

export const store = configureStore({
  reducer: {
    breedChecker: breedCheckerReducer,
  },
}) as Store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
