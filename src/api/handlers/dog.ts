import { axiosGet } from '../utils';

const BASE_URL = 'https://dog.ceo/api/';

export const getImagesByBreed = async ({
  breed,
}: ApiDog.Breed.IQuery): Promise<ApiDog.Breed.IResponse> =>
  axiosGet<ApiDog.Breed.IResponse>(`${BASE_URL}/breed/${breed}/images`);
