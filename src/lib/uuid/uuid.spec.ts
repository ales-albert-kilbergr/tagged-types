import { UUID } from './uuid';
import type { uuid } from './uuid';

describe('(Unit) UUID', () => {
  describe('when casting', () => {
    it('should cast a valid UUID', () => {
      // Arrange
      const input = '00000000-0000-0000-0000-000000000000';
      // Act & Assert
      const result: uuid = UUID(input);
      expect(result).toBe(input);
    });

    it('should throw a UUIDError for an invalid UUID', () => {
      // Arrange
      const input = 'invalid-uuid';
      const act = (): uuid => UUID(input);
      // Act & Assert
      expect(act).toThrow(UUID.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid UUID', () => {
      // Arrange
      const input = '00000000-0000-0000-0000-000000000000';
      // Act & Assert
      UUID.assert(input);
    });

    it('should throw a UUIDError for an invalid UUID', () => {
      // Arrange
      const input = 'invalid-uuid';
      const act = (): void => {
        UUID.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(UUID.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid UUID', () => {
      // Arrange
      const input = '00000000-0000-0000-0000-000000000000';
      // Act
      const result = UUID.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid UUID', () => {
      // Arrange
      const input = 'invalid-uuid';
      // Act
      const result = UUID.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
