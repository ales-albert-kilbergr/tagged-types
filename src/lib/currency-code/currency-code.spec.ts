import { CurrencyCode } from './currency-code';
import type { currencyCode } from './currency-code';

describe('(Unit) CurrencyCode', () => {
  describe('when casting', () => {
    it('should cast a valid CurrencyCode', () => {
      // Arrange
      const input = 'CZK';
      // Act & Assert
      const result: currencyCode = CurrencyCode(input);
      expect(result).toBe(input);
    });

    it('should fail if the input is null.', () => {
      // Arrange
      const input = null;
      // Act
      const act = () => CurrencyCode(input);
      // Assert
      expect(act).toThrow(CurrencyCode.TypeError);
    });

    it('should throw a CurrencyCodeError for an invalid CurrencyCode', () => {
      // Arrange
      const input = 'invalid-CurrencyCode';
      const act = (): currencyCode => CurrencyCode(input);
      // Act & Assert
      expect(act).toThrow(CurrencyCode.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid CurrencyCode', () => {
      // Arrange
      const input = 'CZK';
      // Act & Assert
      CurrencyCode.assert(input);
    });

    it('should throw a CurrencyCodeError for an invalid CurrencyCode', () => {
      // Arrange
      const input = 'invalid-CurrencyCode';
      const act = (): void => {
        CurrencyCode.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(CurrencyCode.TypeError);
    });

    it('should enforce type safety', () => {
      // Arrange
      const input = 'CZK';
      CurrencyCode.assert(input);
      // expect not to throw a compile error
      const result: currencyCode = input;
      expect(result).toBe(input);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid CurrencyCode', () => {
      // Arrange
      const input = 'CZK';
      // Act
      const result = CurrencyCode.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid CurrencyCode', () => {
      // Arrange
      const input = 'invalid-CurrencyCode';
      // Act
      const result = CurrencyCode.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
