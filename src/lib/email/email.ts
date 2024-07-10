import type { Tagged } from 'type-fest';
import isEmail from 'validator/lib/isEmail';
import { declareTaggedType, TaggedTypeError } from '../utils';

export type email = Tagged<string, 'Email'>;

export const Email = declareTaggedType({
  isTypeof: (input: unknown): input is email => {
    return typeof input === 'string' && isEmail(input);
  },
  TypeError: class EmailTypeError extends TaggedTypeError('email') {},
});
