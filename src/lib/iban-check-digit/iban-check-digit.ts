// Public TLD constants --------------------------------------------------------

import type { Tagged } from 'type-fest';
import { declareTaggedType, TaggedTypeError } from '../tagged-type/tagged-type';

const TYPE_LENGTH = 2;

/**
 * Expose the top-level domain string subtype.
 */
export type ibanCheckDigit = Tagged<string, 'ibanCheckDigit'>;

export const IbanCheckDigit = declareTaggedType({
  /**
   * Sanitize the input by converting it to lowercase if the
   * input is a string.
   *
   * @param input
   * @returns the input converted to lowercase if it is a string
   */
  sanitize: (input: unknown) => {
    return typeof input === 'number'
      ? String(input).padStart(TYPE_LENGTH, '0')
      : input;
  },
  /**
   * Check if the input is a valid top-level domain. Method can be
   * used as a type guard.
   *
   * @param input
   * @returns boolean - true if the input is a valid top-level domain
   */
  isTypeof: (input: unknown): input is ibanCheckDigit => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[1-9]{1,${TYPE_LENGTH}}$`).test(input)
    );
  },

  /**
   * An error is thrown if the input is not a valid top-level domain.
   */
  TypeError: class IbanCheckDigitTypeError extends TaggedTypeError(
    'ibanCheckDigit',
  ) {},

  TYPE_LENGTH,
});
