import { Email } from './email';
import type { email } from './email';

describe('(Unit) Email', () => {
  describe('when casting', () => {
    it('should cast a valid Email', () => {
      // Arrange
      const input = 'john.doe@example.com';
      // Act & Assert
      const result: email = Email(input);
      expect(result).toBe(input);
    });

    it('should throw a EmailError for an invalid Email', () => {
      // Arrange
      const input = 'invalid-Email';
      const act = (): email => Email(input);
      // Act & Assert
      expect(act).toThrow(Email.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid Email', () => {
      // Arrange
      const input = 'john.doe@example.com';
      // Act & Assert
      Email.assert(input);
    });

    it('should throw a EmailError for an invalid Email', () => {
      // Arrange
      const input = 'invalid-Email';
      const act = (): void => {
        Email.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(Email.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid Email', () => {
      // Arrange
      const input = 'john.doe@example.com';
      // Act
      const result = Email.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid Email', () => {
      // Arrange
      const input = 'invalid-Email';
      // Act
      const result = Email.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
