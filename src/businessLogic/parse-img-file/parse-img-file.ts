export const parseImgFile = async (file: File) =>
  new Promise<string | null>(resolve => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () =>
      resolve(typeof fileReader.result === 'string' ? fileReader.result : null),
    );
  });
