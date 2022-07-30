import '@tensorflow/tfjs';

import * as mobilenet from '@tensorflow-models/mobilenet';

import { parseImgFile } from './parse-img-file';

const modelPromise = mobilenet.load();

const convertFileToImageData = async (file: File): Promise<ImageData> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = 300;
  const height = 311;

  const image = new Image();
  const imageSrc = await parseImgFile(file);

  if (imageSrc === null || ctx === null) {
    return Promise.reject(new Error('Error image parsing!'));
  }

  image.src = imageSrc;

  return new Promise(resolve => {
    image.addEventListener('load', () => {
      ctx.drawImage(image, 0, 0);
      resolve(ctx.getImageData(0, 0, width, height));
    });
  });
};

export const checkBreed = async (file: File) =>
  modelPromise.then(async model =>
    model.classify(await convertFileToImageData(file)),
  );
