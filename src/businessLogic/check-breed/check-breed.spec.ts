import { checkBreed } from './check-breed';

describe('check-breed', () => {
  it('should be check breed', () => {
    expect.assertions(1);
    expect(typeof checkBreed(new File([], 'test.png'))).toBe('object');
  });
});
