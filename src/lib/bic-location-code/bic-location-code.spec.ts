import { BICLocationCode } from './bic-location-code';
import type { bicLocationCode } from './bic-location-code';

describe('(Unit) BICLocationCode', () => {
  describe('when casting', () => {
    it('should cast a valid BICLocationCode', () => {
      // Arrange
      const input = 'AB';
      // Act & Assert
      const result: bicLocationCode = BICLocationCode(input);
      expect(result).toBe(input);
    });

    it('should throw a BICLocationCodeError for an invalid BICLocationCode', () => {
      // Arrange
      const input = 'invalid-BICLocationCode';
      const act = (): bicLocationCode => BICLocationCode(input);
      // Act & Assert
      expect(act).toThrow(BICLocationCode.TypeError);
    });

    it('should convert the input to uppercase', () => {
      // Arrange
      const input = 'ab';
      // Act
      const result: bicLocationCode = BICLocationCode(input);
      // Assert
      expect(result).toBe('AB');
    });

    it('should convert the input number to a string', () => {
      // Arrange
      const input = 12;
      // Act
      const result: bicLocationCode = BICLocationCode(input);
      // Assert
      expect(result).toBe('12');
    });

    it('should throw if the input is not a string', () => {
      // Arrange
      const input = null;
      const act = (): bicLocationCode => BICLocationCode(input);
      // Act & Assert
      expect(act).toThrow(BICLocationCode.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid BICLocationCode', () => {
      // Arrange
      const input = 'AB';
      // Act & Assert
      BICLocationCode.assert(input);
    });

    it('should throw a BICLocationCodeError for an invalid BICLocationCode', () => {
      // Arrange
      const input = 'invalid-BICLocationCode';
      const act = (): void => {
        BICLocationCode.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(BICLocationCode.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid BICLocationCode', () => {
      // Arrange
      const input = 'AB';
      // Act
      const result = BICLocationCode.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid BICLocationCode', () => {
      // Arrange
      const input = 'invalid-BICLocationCode';
      // Act
      const result = BICLocationCode.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
