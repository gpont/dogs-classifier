import { useGetDogsByBreedQuery } from '../services';

export const useGetImagesOfBreed = (breed: string) => {
  const { data, isLoading, isFetching, isError } = useGetDogsByBreedQuery(
    breed,
    {
      pollingInterval: 20000,
      refetchOnMountOrArgChange: true,
      skip: false,
    },
  );

  return {
    breed,
    images: isError === true ? [] : data?.message ?? [],
    isError,
    isLoading: isLoading === true || isFetching === true,
  };
};
