import type { Tagged } from 'type-fest';
import isIBAN from 'validator/lib/isIBAN';
import { CountryCode, type countryCode } from '../country-code/country-code';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import { declareTaggedType, TaggedTypeError } from '../utils';
import {
  IbanCheckDigit,
  type ibanCheckDigit,
} from '../iban-check-digit/iban-check-digit';

export type iban = Tagged<string, 'IBAN'>;

export const IBAN = declareTaggedType({
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string'
      ? input.toUpperCase().replace(/\s/g, '')
      : input;
  },
  isTypeof: (input: unknown): input is iban => {
    return typeof input === 'string' && isIBAN(input);
  },
  TypeError: class IBANTypeError extends TaggedTypeError('iban') {},

  parse: (input: iban) => {
    const rx = new RegExp(
      `(?<countryCode>\d{${CountryCode.TYPE_LENGTH}})(?<checkDigits>\d{${IbanCheckDigit.TYPE_LENGTH}})(?<bban>\d{${(BBAN.MIN_LENGTH, BBAN.MAX_LENGTH)}})`,
    );
    const groups = rx.exec(input)?.groups;

    if (!groups) {
      throw new TypeError('Failed to parse an iban. No groups from regExp');
    }
    groups as unknown as IBANComponents;
  },

  from: (components: IBANComponents): iban => {
    return `${components.countryCode}${components.checkDigits}${components.bban}` as iban;
  },
});

export interface IBANComponents {
  countryCode: countryCode;
  checkDigits: ibanCheckDigit;
  bban: bban;
}
