import { createAsyncThunk } from '@reduxjs/toolkit';

import { checkBreed, parseImgFile } from '../../../businessLogic';

export const loadFile = createAsyncThunk(
  'breedChecker/loadFile',
  async (file: File) => ({
    breeds: await checkBreed(file),
    img: await parseImgFile(file),
  }),
);
