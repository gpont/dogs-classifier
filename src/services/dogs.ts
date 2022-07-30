import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://dog.ceo/api/';

export const dogsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: <BaseQuery, TagTypes, ReducerPath>(
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>,
  ): Definitions => ({
    getDogsByBreed: builder.query<ApiDog.Breed.IResponse, string>({
      query: (breed: string): string => `breed/${breed}/images`,
    }),
  }),
  reducerPath: 'dogsApi',
});
