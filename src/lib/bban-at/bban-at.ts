import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../utils';

const BANK_COAT_LENGTH = 5;

const ACCOUNT_LENGTH = 11;

const TYPE_LENGTH = BANK_COAT_LENGTH + ACCOUNT_LENGTH;

class BBAN_AT_TypeError extends BBAN.TypeError {}

export type bban_at = Tagged<bban, 'bban_at'>;

export interface BBAN_AT_Components {
  bankCode: string;
  accountNumber: string;
}

export const BBAN_AT = declareTaggedType({
  /**
   * Sanitizes the input by removing any whitespace.
   *
   * @param input
   * @returns
   */
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string' ? input.replace(/\s+/g, '') : input;
  },
  /**
   * Checks if the input is a valid German BBAN. Method can be used as a type guard.
   *
   * @param input
   * @returns
   */
  isTypeof: (input: unknown): input is bban_at => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },
  parse: BBAN.createParser<bban_at, BBAN_AT_Components>(
    `(?<bankCode>\d{${BANK_COAT_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})`,
  ),
  from: (components: BBAN_AT_Components): bban_at => {
    const bankCode = components.bankCode.padStart(BANK_COAT_LENGTH, '0');
    const accountNumber = components.accountNumber.padStart(
      ACCOUNT_LENGTH,
      '0',
    );

    return `${bankCode}${accountNumber}` as bban_at;
  },

  TypeError: BBAN_AT_TypeError,
  /**
   * Overall length of the German BBAN.
   */
  TYPE_LENGTH: BANK_COAT_LENGTH + ACCOUNT_LENGTH,
  /**
   * Length of the bank code in the German BBAN.
   */
  BANK_COAT_LENGTH,
  /**
   * Length of the account prefix in the German BBAN.
   */
  ACCOUNT_LENGTH,
});

// Register as a parser to the common BBAN parser registry
BBAN.parsers.set('AT' as countryCode, BBAN_AT.parse);
