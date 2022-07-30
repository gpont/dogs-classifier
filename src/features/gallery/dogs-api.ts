import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://dog.ceo/api/';

export const dogsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (
    builder: EndpointBuilder<
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      'dogsApi'
    >,
  ) => ({
    getDogsByBreed: builder.query<ApiDog.Breed.IResponse, string>({
      query: (breed: string): string => `breed/${breed}/images`,
    }),
  }),
  reducerPath: 'dogsApi',
});

export const { useGetDogsByBreedQuery, usePrefetch } = dogsApi;
