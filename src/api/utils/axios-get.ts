import axios, { AxiosResponse } from 'axios';

export const axiosGet = async <TReturn>(url: string): Promise<TReturn> =>
  axios
    .get<TReturn>(url)
    .then(({ data }: AxiosResponse<TReturn>): TReturn => data);
