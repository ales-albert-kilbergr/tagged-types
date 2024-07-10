import type { Tagged } from 'type-fest';
import isJwt from 'validator/lib/isJwt';
import { declareTaggedType, TaggedTypeError } from '../utils';

export type jwt = Tagged<string, 'Jwt'>;

export const JWT = declareTaggedType({
  /**
   * Check if the input is a valid Jwt.
   *
   * @param input
   * @returns
   */
  isTypeof: (input: unknown): input is jwt => {
    return typeof input === 'string' && isJwt(input);
  },
  /**
   * The error to be thrown when the input is not a valid Jwt.
   */
  TypeError: class JwtTypeError extends TaggedTypeError('jwt') {},
});
