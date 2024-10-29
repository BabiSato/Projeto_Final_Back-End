import { isValidEmail, isValidPrice, isValidTitle } from "./validationHelper";

describe('Helpers', () => {
  describe('isValidEmail', () => {
    it('should return true for valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
    });
  });

  describe('isValidPrice', () => {
    it('should return true for price greater than 0', () => {
      expect(isValidPrice(10)).toBe(true);
    });

    it('should return false for price less than or equal to 0', () => {
      expect(isValidPrice(0)).toBe(false);
      expect(isValidPrice(-5)).toBe(false);
    });
  });

  describe('isValidTitle', () => {
    it('should return true for title with at least 3 characters', () => {
      expect(isValidTitle('Book')).toBe(true);
    });

    it('should return false for title with less than 3 characters', () => {
      expect(isValidTitle('AB')).toBe(false);
    });
  });
});