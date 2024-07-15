import type { Tagged } from 'type-fest';
import isUUID from 'validator/lib/isUUID';
import { declareTaggedType, TaggedTypeError } from '../tagged-type/tagged-type';

export type uuid = Tagged<string, 'uuid'>;

export const UUID = declareTaggedType({
  /**
   * Check if the input is a valid UUID. Method can be
   * used as a type guard.
   *
   * @param input
   * @returns boolean - true if the input is a valid UUID
   */
  isTypeof: (input: unknown): input is uuid => {
    return typeof input === 'string' && isUUID(input);
  },
  /**
   * An error is thrown if the input is not a valid UUID.
   */
  TypeError: class UUIDTypeError extends TaggedTypeError('uuid') {},
});
