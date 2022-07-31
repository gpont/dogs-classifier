import '@tensorflow/tfjs';

import * as mobilenet from '@tensorflow-models/mobilenet';

import { convertFileToImageData } from './convert-file-to-image-data';

const modelPromise = mobilenet.load();

export const checkBreed = async (file: File) =>
  modelPromise.then(async model =>
    model.classify(await convertFileToImageData(file)),
  );
