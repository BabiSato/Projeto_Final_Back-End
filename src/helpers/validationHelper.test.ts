import { isValidTitle } from '../helpers/validationHelper';

describe('Validation Helper - isValidTitle', () => {
  it('should return true for valid titles', () => {
    expect(isValidTitle('Harry Potter')).toBe(true);
  });

  it('should return false for titles shorter than 3 characters', () => {
    expect(isValidTitle('Go')).toBe(false);
  });
});