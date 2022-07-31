import { RootState } from '../../../app/store';

const breedsCheckerSelector = (state: RootState) => state.breedChecker;

export const breedsSelector = (state: RootState) =>
  breedsCheckerSelector(state).breeds.map(({ className }: Breed) => className);

export const imgSelector = (state: RootState) =>
  breedsCheckerSelector(state).img;
export const statusSelector = (state: RootState) =>
  breedsCheckerSelector(state).status;
