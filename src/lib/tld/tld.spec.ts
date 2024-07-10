import { TLD } from './tld';
import type { tld } from './tld';

describe('(Unit) TLD', () => {
  describe('when casting', () => {
    it('should cast a valid TLD', () => {
      // Arrange
      const input = 'com';
      // Act & Assert
      const result: tld = TLD(input);
      expect(result).toBe(input);
    });

    it('should throw a TLDTypeError for an invalid TLD', () => {
      // Arrange
      const input = 'invalid-TLD';
      const act = (): tld => TLD(input);
      // Act & Assert
      expect(act).toThrow(TLD.TypeError);
    });

    it('should fail to cast a number', () => {
      // Arrange
      const input = 123;
      const act = (): tld => TLD(input);
      // Act & Assert
      expect(act).toThrow(TLD.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid TLD', () => {
      // Arrange
      const input = 'com8';
      // Act & Assert
      TLD.assert(input);
    });

    it('should throw a TLDTypeError for an invalid TLD', () => {
      // Arrange
      const input = 'invalid-TLD';
      const act = (): void => {
        TLD.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(TLD.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid TLD', () => {
      // Arrange
      const input = 'com';
      // Act
      const result = TLD.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should fail for a NULL', () => {
      // Arrange
      const input = null;
      const result = TLD.isTypeof(input);
      // Act & Assert
      expect(result).toBe(false);
    });

    it('should fail if the TLD is too long', () => {
      // Arrange
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const input = 'a'.repeat(TLD.TLD_MAX_LENGTH + 1);
      const result = TLD.isTypeof(input);
      // Act & Assert
      expect(result).toBe(false);
    });

    it('should return false for an invalid TLD', () => {
      // Arrange
      const input = 'invalid-TLD';
      // Act
      const result = TLD.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
