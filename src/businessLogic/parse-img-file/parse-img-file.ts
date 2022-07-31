export const parseImgFile = async (file: File) =>
  new Promise<string | null>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () =>
      typeof fileReader.result === 'string'
        ? resolve(fileReader.result)
        : reject(new Error('Image parse error')),
    );
  });
