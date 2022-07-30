import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/dist/mapBuilders';

import { RootState } from '../../app/store';
import { checkBreed } from '../../buisnessLogic';
import { parseImgFile } from '../../buisnessLogic/parse-img-file';

export interface BreedCheckerState {
  breeds: string[];
  img: string | null;
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
          action: PayloadAction<{
            breeds: string[];
            img: string | null;
          }>,
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

export const breedsSelector = (state: RootState) => state.breedChecker.breeds;
export const imgSelector = (state: RootState) => state.breedChecker.img;
