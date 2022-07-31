import './gallery.css';

import React from 'react';

import { Loader } from '../../components/loader';
import { useGetDogsByBreedQuery } from './services';

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
    <div className="gallery-container">
      <Loader status={isLoading === true ? 'loading' : 'success'} />
      <div>
        {images.map(({ data, breed }: { data: string[]; breed: string }) =>
          data.length > 0 ? (
            <div>
              <div className="breed-header">{breed}</div>

              <div className="grid" key={breed}>
                {data.map((src: string) => (
                  <div className="image-container" key={src}>
                    <img className="image" loading="lazy" src={src} />
                  </div>
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
