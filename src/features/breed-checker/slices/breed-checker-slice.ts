import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/dist/mapBuilders';

import { loadFile } from './load-file';

export interface BreedCheckerState {
  breeds: Breed[];
  img: Image;
  status: Status;
}

const initialState: BreedCheckerState = {
  breeds: [],
  img: null,
  status: 'idle',
};

const byProbability = (first: Breed, second: Breed) =>
  second.probability - first.probability;

export const breedCheckerSlice = createSlice({
  extraReducers: (builder: ActionReducerMapBuilder<BreedCheckerState>) => {
    builder
      .addCase(loadFile.pending, (state: BreedCheckerState) => {
        state.status = 'loading';
      })
      .addCase(
        loadFile.fulfilled,
        (
          state: BreedCheckerState,
          action: PayloadAction<Pick<BreedCheckerState, 'breeds' | 'img'>>,
        ) => {
          state.breeds = Array.from<Breed>(action.payload.breeds)
            .sort(byProbability)
            .map((breed: Breed) => ({
              className: breed.className.toLowerCase().split(', ')[0],
              probability: breed.probability,
            }));
          state.img = action.payload.img;
          state.status = 'success';
        },
      )
      .addCase(loadFile.rejected, (state: BreedCheckerState) => {
        state.breeds = [];
        state.img = null;
        state.status = 'failed';
      });
  },
  initialState,
  name: 'breedChecker',
  reducers: {},
});

export default breedCheckerSlice.reducer;
