import { BICBranchCode } from './bic-branch-code';
import type { bicBranchCode } from './bic-branch-code';

describe('(Unit) BICBranchCode', () => {
  describe('when casting', () => {
    it('should cast a valid BICBranchCode', () => {
      // Arrange
      const input = 'ABC';
      // Act & Assert
      const result: bicBranchCode = BICBranchCode(input);
      expect(result).toBe(input);
    });

    it('should throw a BICBranchCodeError for an invalid BICBranchCode', () => {
      // Arrange
      const input = 'invalid-BICBranchCode';
      const act = (): bicBranchCode => BICBranchCode(input);
      // Act & Assert
      expect(act).toThrow(BICBranchCode.TypeError);
    });

    it('should convert the input to uppercase', () => {
      // Arrange
      const input = 'abc';
      // Act
      const result: bicBranchCode = BICBranchCode(input);
      // Assert
      expect(result).toBe('ABC');
    });

    it('should convert the input number to a string', () => {
      // Arrange
      const input = 123;
      // Act
      const result: bicBranchCode = BICBranchCode(input);
      // Assert
      expect(result).toBe('123');
    });

    it('should throw if the input is not a string', () => {
      // Arrange
      const input = null;
      const act = (): bicBranchCode => BICBranchCode(input);
      // Act & Assert
      expect(act).toThrow(BICBranchCode.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid BICBranchCode', () => {
      // Arrange
      const input = 'ABC';
      // Act & Assert
      BICBranchCode.assert(input);
    });

    it('should throw a BICBranchCodeError for an invalid BICBranchCode', () => {
      // Arrange
      const input = 'invalid-BICBranchCode';
      const act = (): void => {
        BICBranchCode.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(BICBranchCode.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid BICBranchCode', () => {
      // Arrange
      const input = 'ABC';
      // Act
      const result = BICBranchCode.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid BICBranchCode', () => {
      // Arrange
      const input = 'invalid-BICBranchCode';
      // Act
      const result = BICBranchCode.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
