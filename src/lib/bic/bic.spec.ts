import { BIC } from './bic';
import type { bic, BICComponents } from './bic';

describe('(Unit) BIC', () => {
  describe('when casting', () => {
    it('should cast a valid BIC', () => {
      // Arrange
      const input = 'HBUKGB4B';
      // Act & Assert
      const result: bic = BIC(input);
      expect(result).toBe(input);
    });

    it('should throw a BICError for an invalid BIC', () => {
      // Arrange
      const input = 'invalid-BIC';
      const act = (): bic => BIC(input);
      // Act & Assert
      expect(act).toThrow(BIC.TypeError);
    });

    it('should convert the input to uppercase', () => {
      // Arrange
      const input = 'hbukgb4b';
      // Act
      const result: bic = BIC(input);
      // Assert
      expect(result).toBe('HBUKGB4B');
    });

    it('should replace empty spaces', () => {
      // Arrange
      const input = 'HBUK GB 4B';
      // Act
      const result: bic = BIC(input);
      // Assert
      expect(result).toBe('HBUKGB4B');
    });

    it('should fail for NULL', () => {
      // Arrange
      const input = null;
      const act = (): bic => BIC(input);
      // Act & Assert
      expect(act).toThrow(BIC.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid BIC', () => {
      // Arrange
      const input = 'HBUKGB4B';
      // Act & Assert
      BIC.assert(input);
    });

    it('should throw a BICError for an invalid BIC', () => {
      // Arrange
      const input = 'invalid-BIC';
      const act = (): void => {
        BIC.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(BIC.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid BIC', () => {
      // Arrange
      const input = 'HBUKGB4B';
      // Act
      const result = BIC.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid BIC', () => {
      // Arrange
      const input = 'invalid-BIC';
      // Act
      const result = BIC.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });

  describe('when parsing', () => {
    it('should parse a valid BIC without branch code', () => {
      // Arrange
      const input = 'HBUKGB4B' as bic;
      // Act
      const result = BIC.parse(input);
      // Assert
      expect(result).toEqual({
        bankCode: 'HBUK',
        countryCode: 'GB',
        locationCode: '4B',
        branchCode: '',
      });
    });

    it('should parse a valid BIC with branch code', () => {
      // Arrange
      const input = 'HBUKGB4BXXX' as bic;
      // Act
      const result = BIC.parse(input);
      // Assert
      expect(result).toEqual({
        bankCode: 'HBUK',
        countryCode: 'GB',
        locationCode: '4B',
        branchCode: 'XXX',
      });
    });
  });

  describe('when building from components', () => {
    it('should build a valid BIC without branch code', () => {
      // Arrange
      const input = {
        bankCode: 'HBUK',
        countryCode: 'GB',
        locationCode: '4B',
      } as BICComponents;
      // Act
      const result = BIC.from(input);
      // Assert
      expect(result).toBe('HBUKGB4B');
    });

    it('should build a valid BIC with branch code', () => {
      // Arrange
      const input = {
        bankCode: 'HBUK',
        countryCode: 'GB',
        locationCode: '4B',
        branchCode: 'XXX',
      } as BICComponents;
      // Act
      const result = BIC.from(input);
      // Assert
      expect(result).toBe('HBUKGB4BXXX');
    });
  });
});
