import { parseImgFile } from '../parse-img-file';

export const convertFileToImageData = async (
  file: File,
): Promise<ImageData> => {
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

  return new Promise((resolve, reject) => {
    image.addEventListener('load', () => {
      ctx.drawImage(image, 0, 0);
      resolve(ctx.getImageData(0, 0, width, height));
    });
    image.addEventListener('error', () =>
      reject(new Error('Error image loading')),
    );
  });
};
