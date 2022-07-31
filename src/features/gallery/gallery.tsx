import './gallery.css';

import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '../../components/loader';
import { useGetImagesOfBreed } from './hooks';

interface IGalleryProps {
  breeds: string[];
}

const IMAGES_COUNT_SLICE = 10;

export const Gallery: React.FC<IGalleryProps> = ({ breeds }) => {
  const [breed] = breeds;
  const { images, isLoading, isError } = useGetImagesOfBreed(breed);

  const [imagesSlice, setImagesSlice] = useState<string[]>([]);

  useEffect(() => {
    if (images.length > 0 || (images.length === 0 && imagesSlice.length > 0)) {
      setImagesSlice(images.slice(0, IMAGES_COUNT_SLICE));
    }
  }, [images]);

  const fetchMoreData = useCallback(() => {
    if (imagesSlice.length < images.length) {
      setImagesSlice([
        ...imagesSlice,
        ...images.slice(
          imagesSlice.length,
          imagesSlice.length + IMAGES_COUNT_SLICE,
        ),
      ]);
    }
  }, [images, imagesSlice]);

  return (
    <div className="gallery-container">
      <Loader
        status={
          isError === true
            ? 'failed'
            : isLoading === true
            ? 'loading'
            : 'success'
        }
      />
      <div>
        <div className="breed-header">{breed}</div>

        {images.length > 0 ? (
          <InfiniteScroll
            dataLength={imagesSlice.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
              <Loader status={images.length === 0 ? 'idle' : 'loading'} />
            }
          >
            <div className="grid">
              {imagesSlice.map((src: string) => (
                <div className="image-container" key={src}>
                  <img className="image" loading="lazy" src={src} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : null}
      </div>
    </div>
  );
};
