import { parseImgFile } from './parse-img-file';

describe('parseImgFile', () => {
  it('should parse image', () => {
    expect.assertions(1);
    expect(typeof parseImgFile(new File([], 'test.png'))).toBe('object');
  });
});
