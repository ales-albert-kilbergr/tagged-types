// Public TLD constants --------------------------------------------------------

import type { Tagged } from 'type-fest';
import { declareTaggedType, TaggedTypeError } from '../utils';

const TLD_MAX_LENGTH = 63;

/**
 * Expose the top-level domain string subtype.
 */
export type tld = Tagged<string, 'TLD'>;

export const TLD = declareTaggedType({
  /**
   * Sanitize the input by converting it to lowercase if the
   * input is a string.
   *
   * @param input
   * @returns the input converted to lowercase if it is a string
   */
  sanitize: (input: unknown) => {
    return typeof input === 'string' ? input.toLowerCase() : input;
  },
  /**
   * Check if the input is a valid top-level domain. Method can be
   * used as a type guard.
   *
   * @param input
   * @returns boolean - true if the input is a valid top-level domain
   */
  isTypeof: (input: unknown): input is tld => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[a-z1-9]{1,${TLD_MAX_LENGTH}}$`).test(input)
    );
  },

  /**
   * An error is thrown if the input is not a valid top-level domain.
   */
  TypeError: class TLDTypeError extends TaggedTypeError('TLD') {},
  /**
   * The maximum length of a top-level domain.
   */
  TLD_MAX_LENGTH,
});
