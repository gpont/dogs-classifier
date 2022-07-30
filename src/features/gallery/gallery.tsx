import React from 'react';

import { Loader } from '../../components/loader';
import { useGetDogsByBreedQuery } from './dogs-api';

const useGetImagesOfBreeds = (breeds: string[]) => {
  const images = breeds.map((breed: string) => {
    const { data, isLoading, isFetching } = useGetDogsByBreedQuery(breed, {
      pollingInterval: 20000,
      refetchOnMountOrArgChange: true,
      skip: false,
    });

    return {
      breed,
      data: data?.message ?? [],
      isLoading: isLoading === true || isFetching === true,
    };
  });

  return {
    images,
    isLoading: images.reduce(
      (acc: boolean, { isLoading }: { isLoading: boolean }) => isLoading || acc,
      false,
    ),
  };
};

interface IGalleryProps {
  breeds: string[];
}

export const Gallery: React.FC<IGalleryProps> = ({ breeds }) => {
  const { images, isLoading } = useGetImagesOfBreeds(breeds);

  return (
    <div>
      <Loader status={isLoading === true ? 'loading' : 'success'} />
      <ul>
        {images.map(({ data, breed }: { data: string[]; breed: string }) => (
          <div key={breed}>
            <span>{breed}</span>
            {data.map((src: string) => (
              <img key={src} src={src} />
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};
