import type { Tagged } from 'type-fest';
import { declareTaggedType, TaggedTypeError } from '../tagged-type/tagged-type';

/**
 * The BIC bank code string subtype. The Bank code is represented by the
 * 4 letters (A-Z).
 */
export type bicBankCode = Tagged<string, 'bicBankCode'>;

const TYPE_LENGTH = 4;
/**
 * The BIC bank code type.
 */
export const BICBankCode = declareTaggedType({
  /**
   * Sanitize the input before being cast to the BIC bank code type.
   * In case of input being string, it will be converted to uppercase.
   */
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string' ? input.toUpperCase() : input;
  },
  /**
   * Check if the input is a valid BIC bank code.
   */
  isTypeof: (input: unknown): input is bicBankCode => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[A-Z]{${TYPE_LENGTH}}$`).test(input)
    );
  },
  /**
   * The error to be thrown when the input is not a valid BIC bank code.
   */
  TypeError: class BICBankCodeTypeError extends TaggedTypeError(
    'bicBankCode',
  ) {},
  /**
   * The length of the BIC bank code.
   */
  TYPE_LENGTH,
});
