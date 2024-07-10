import { CountryCode } from './country-code';
import type { countryCode } from './country-code';

describe('(Unit) CountryCode', () => {
  describe('when accessing constants', () => {
    it('should return the correct length', () => {
      // Arrange
      // Act
      const result = CountryCode.TYPE_LENGTH;
      // Assert
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expect(result).toBe(2);
    });
  });

  describe('when casting', () => {
    it('should cast a valid CountryCode', () => {
      // Arrange
      const input = 'CZ';
      // Act & Assert
      const result: countryCode = CountryCode(input);
      expect(result).toBe(input);
    });

    it('should throw a CountryCodeTypeError for an invalid CountryCode', () => {
      // Arrange
      const input = 'invalid-CountryCode';
      const act = (): countryCode => CountryCode(input);
      // Act & Assert
      expect(act).toThrow(CountryCode.TypeError);
    });

    it('should fail for NULL', () => {
      // Arrange
      const input = null;
      const act = (): countryCode => CountryCode(input);
      // Act & Assert
      expect(act).toThrow(CountryCode.TypeError);
    });

    it('should convert the input to uppercase', () => {
      // Arrange
      const input = 'cz';
      // Act
      const result: countryCode = CountryCode(input);
      // Assert
      expect(result).toBe('CZ');
    });
  });

  describe('when asserting', () => {
    it('should assert a valid CountryCode', () => {
      // Arrange
      const input = 'DE';
      // Act & Assert
      CountryCode.assert(input);
    });

    it('should throw a CountryCodeTypeError for an invalid CountryCode', () => {
      // Arrange
      const input = 'invalid-CountryCode';
      const act = (): void => {
        CountryCode.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(CountryCode.TypeError);
    });

    it('should enforce type safety', () => {
      // Arrange
      const input = 'FR';
      CountryCode.assert(input);
      // expect not to throw a compile error
      const result: countryCode = input;
      expect(result).toBe(input);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid CountryCode', () => {
      // Arrange
      const input = 'FR';
      // Act
      const result = CountryCode.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid CountryCode', () => {
      // Arrange
      const input = 'invalid-CountryCode';
      // Act
      const result = CountryCode.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
