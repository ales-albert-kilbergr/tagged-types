import { IBAN } from './iban';
import type { iban } from './iban';

describe('(Unit) IBAN', () => {
  describe('when casting', () => {
    it('should cast a valid IBAN', () => {
      // Arrange
      const input = 'CZ5508000000001234567899';
      // Act & Assert
      const result: iban = IBAN(input);
      expect(result).toBe(input);
    });

    it('should throw a IBANError for an invalid IBAN', () => {
      // Arrange
      const input = 'invalid-IBAN';
      const act = (): iban => IBAN(input);
      // Act & Assert
      expect(act).toThrow(IBAN.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid IBAN', () => {
      // Arrange
      const input = 'CZ5508000000001234567899';
      // Act & Assert
      IBAN.assert(input);
    });

    it('should throw a IBANError for an invalid IBAN', () => {
      // Arrange
      const input = 'invalid-IBAN';
      const act = (): void => {
        IBAN.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(IBAN.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid IBAN', () => {
      // Arrange
      const input = 'CZ5508000000001234567899';
      // Act
      const result = IBAN.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid IBAN', () => {
      // Arrange
      const input = 'invalid-IBAN';
      // Act
      const result = IBAN.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
