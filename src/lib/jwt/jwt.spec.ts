import { JWT } from './jwt';
import type { jwt } from './jwt';
import { sign } from 'jsonwebtoken';

describe('(Unit) Jwt', () => {
  describe('when casting', () => {
    it('should cast a valid Jwt', () => {
      // Arrange
      const input = sign('payload', 'secret');
      // Act & Assert
      const result: jwt = JWT(input);
      expect(result).toBe(input);
    });

    it('should throw a JWTError for an invalid Jwt', () => {
      // Arrange
      const input = 'invalid-Jwt';
      const act = (): jwt => JWT(input);
      // Act & Assert
      expect(act).toThrow(JWT.TypeError);
    });
  });

  describe('when asserting', () => {
    it('should assert a valid Jwt', () => {
      // Arrange
      const input = sign('payload', 'secret');
      // Act & Assert
      JWT.assert(input);
    });

    it('should throw a JWTError for an invalid Jwt', () => {
      // Arrange
      const input = 'invalid-Jwt';
      const act = (): void => {
        JWT.assert(input);
      };
      // Act & Assert
      expect(act).toThrow(JWT.TypeError);
    });
  });

  describe('when checking', () => {
    it('should return true for a valid Jwt', () => {
      // Arrange
      const input = sign({}, 'secret', {});
      // Act
      const result = JWT.isTypeof(input);
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for an invalid Jwt', () => {
      // Arrange
      const input = 'invalid-Jwt';
      // Act
      const result = JWT.isTypeof(input);
      // Assert
      expect(result).toBe(false);
    });
  });
});
