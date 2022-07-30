import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/dist/mapBuilders';

import { RootState } from '../../app/store';
import { checkBreed, parseImgFile } from '../../buisnessLogic';

interface Breed {
  className: string;
  probability: number;
}
type Image = string | null;

export interface BreedCheckerState {
  breeds: Breed[];
  img: Image;
  status: 'no-file' | 'checking' | 'checked' | 'failed';
}

const initialState: BreedCheckerState = {
  breeds: [],
  img: null,
  status: 'no-file',
};

export const loadFile = createAsyncThunk(
  'breedChecker/loadFile',
  async (file: File) => ({
    breeds: await checkBreed(file),
    img: await parseImgFile(file),
  }),
);

export const breedCheckerSlice = createSlice({
  extraReducers: (builder: ActionReducerMapBuilder<BreedCheckerState>) => {
    builder
      .addCase(loadFile.pending, (state: BreedCheckerState) => {
        state.status = 'checking';
      })
      .addCase(
        loadFile.fulfilled,
        (
          state: BreedCheckerState,
          action: PayloadAction<Pick<BreedCheckerState, 'breeds' | 'img'>>,
        ) => {
          state.breeds = action.payload.breeds;
          state.img = action.payload.img;
          state.status = 'checked';
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

const byProbability = (first: Breed, second: Breed) =>
  first.probability - second.probability;

export const breedsSelector = (state: RootState) =>
  Array.from<Breed>(state.breedChecker.breeds)
    .sort(byProbability)
    .map(({ className }: Breed) => className);

export const imgSelector = (state: RootState) => state.breedChecker.img;
