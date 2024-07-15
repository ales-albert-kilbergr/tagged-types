import type { Tagged } from 'type-fest';
import { declareTaggedType, TaggedTypeError } from '../tagged-type/tagged-type';

/**
 * The BIC branch code string subtype. The Branch code is represented by the
 * 3 letters (A-Z) or numbers (0-9). The `XXX` represents the head office.
 */
export type bicBranchCode = Tagged<string, 'BicBranchCode'>;

const TYPE_LENGTH = 3;

export const BICBranchCode = declareTaggedType({
  /**
   * Sanitize the input before being cast to the BIC branch code type.
   * In case of input being string, it will be converted to uppercase.
   *
   * The input can be numeric, in that case it will be converted to a string.
   */
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string'
      ? input.toUpperCase()
      : typeof input === 'number'
        ? String(input)
        : input;
  },
  /**
   * Check if the input is a valid BIC branch code.
   */
  isTypeof: (input: unknown): input is bicBranchCode => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[A-Z0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },
  /**
   * The error to be thrown when the input is not a valid BIC branch code.
   */
  TypeError: class BICBranchCodeTypeError extends TaggedTypeError(
    'BicBranchCode',
  ) {},
  /**
   * The length of the BIC branch code.
   */
  TYPE_LENGTH,
  /**
   * The head office branch code.
   */
  HEAD_OFFICE: 'XXX' as bicBranchCode,
});
