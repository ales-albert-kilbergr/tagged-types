import { BICBankCode } from './bic-bank-code';
import type { bicBankCode } from './bic-bank-code';

describe('(Unit) BICBankCode', () => {
  describe('when casting', () => {
    it('should cast a valid BICBankCode', () => {
      // Arrange
      const input = 'ABCD';
      // Act & Assert
      const result: bicBankCode = BICBankCode(input);
      expect(result).toBe(input);
    });

    it('should throw if the input is not a string', () => {
      // Arrange
      const input = 123;
      const act = (): bicBankCode => BICBankCode(input);
      // Act & Assert
      expect(act).toThrow(BICBankCode.TypeError);
    });

    it('should convert the input to uppercase', () => {
      // Arrange
      const input = 'abcd';
      // Act
      const result: bicBankCode = BICBankCode(input);
      // Assert
      expect(result).toBe('ABCD');
    });

    it('should throw a BICBankCodeError for an invalid BICBankCode', () => {
      // Arrange
      const input = 'invalid-BICBankCode';
      const act = (): bicBankCode => BICBankCode(input);
      // Act & Assert
      expect(act).toThrow(BICBankCode.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid BICBankCode', () => {
      // Arrange
      const input = 'ABCD';
      // Act & Assert
      BICBankCode.assert(input);
    });

    it('should throw a BICBankCodeError for an invalid BICBankCode', () => {
      // Arrange
      const input = 'invalid-BICBankCode';
      const act = (): void => {
        BICBankCode.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(BICBankCode.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid BICBankCode', () => {
      // Arrange
      const input = 'ABCD';
      // Act
      const result = BICBankCode.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid BICBankCode', () => {
      // Arrange
      const input = 'invalid-BICBankCode';
      // Act
      const result = BICBankCode.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
