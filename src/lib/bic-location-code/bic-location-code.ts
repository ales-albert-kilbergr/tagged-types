import type { Tagged } from 'type-fest';
import { declareTaggedType, TaggedTypeError } from '../utils';

/**
 * Expose the BIC location code string subtype.
 */

const TYPE_LENGTH = 2;

export type bicLocationCode = Tagged<string, 'BicLocationCode'>;

export const BICLocationCode = declareTaggedType({
  /**
   * Sanitize the input before being cast to the BIC location code type.
   * In case of input being string, it will be converted to uppercase.
   *
   * The location code is represented by the 2 letters (A-Z) or numbers (0-9).
   */
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string'
      ? input.toUpperCase()
      : typeof input === 'number'
        ? String(input)
        : input;
  },
  /**
   * Check if the input is a valid BIC location code.
   */
  isTypeof: (input: unknown): input is bicLocationCode => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[A-Z0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },
  TypeError: class BICLocationCodeTypeError extends TaggedTypeError(
    'BicLocationCode',
  ) {},
  /**
   * The length of the BIC location code.
   */
  TYPE_LENGTH,
});
