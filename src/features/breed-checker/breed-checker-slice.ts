import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/dist/mapBuilders';

import { RootState } from '../../app/store';
import { checkBreed, parseImgFile } from '../../businessLogic';

interface Breed {
  className: string;
  probability: number;
}
type Image = string | null;

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

export const loadFile = createAsyncThunk(
  'breedChecker/loadFile',
  async (file: File) => ({
    breeds: await checkBreed(file),
    img: await parseImgFile(file),
  }),
);

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
            .map(breed => ({
              className: breed.className.toLowerCase(),
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

export const breedsSelector = (state: RootState) =>
  state.breedChecker.breeds.map(({ className }: Breed) => className);

export const imgSelector = (state: RootState) => state.breedChecker.img;
export const statusSelector = (state: RootState) => state.breedChecker.status;
