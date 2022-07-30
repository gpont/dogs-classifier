export const parseImgFile = async (file: File) =>
  new Promise<string | null>(resolve => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => {
      // Console.log({ file: fileReader.result });
      resolve(typeof fileReader.result === 'string' ? fileReader.result : null);
    });
  });
