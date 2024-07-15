import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../tagged-type/tagged-type';

// Public CZ BBAN constants --------------------------------------------
const TYPE_LENGTH = 20;

const BANK_CODE_LENGTH = 4;

const ACCOUNT_PREFIX_LENGTH = 6;

const ACCOUNT_LENGTH = 10;

class BBAN_CZ_TypeError extends BBAN.TypeError {}

export type bban_cz = Tagged<bban, 'bban_cz'>;

export interface BBAN_CZ_Components {
  bankCode: string;
  accountPrefix: string;
  accountNumber: string;
}

export const BBAN_CZ = declareTaggedType({
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
   * Checks if the input is a valid Czech BBAN. Method can be used as a type guard.
   *
   * @param input
   * @returns
   */
  isTypeof: (input: unknown): input is bban_cz => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },

  parse: BBAN.createParser<bban_cz, BBAN_CZ_Components>(
    `(?<bankCode>\d{${BANK_CODE_LENGTH}})(?<accountPrefix>\d{${ACCOUNT_PREFIX_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})`,
  ),

  from: (components: BBAN_CZ_Components): bban_cz => {
    const bankCode = components.bankCode.padStart(BANK_CODE_LENGTH, '0');
    const accountPrefix = components.accountPrefix.padStart(
      ACCOUNT_PREFIX_LENGTH,
      '0',
    );
    const accountNumber = components.accountNumber.padStart(
      ACCOUNT_LENGTH,
      '0',
    );

    return `${bankCode}${accountPrefix}${accountNumber}` as bban_cz;
  },

  TypeError: BBAN_CZ_TypeError,
  /**
   * Overall length of the Czech BBAN.
   */
  TYPE_LENGTH: BANK_CODE_LENGTH + ACCOUNT_PREFIX_LENGTH + ACCOUNT_LENGTH,
  /**
   * Length of the bank code in the Czech BBAN.
   */
  BANK_CODE_LENGTH,
  /**
   * Length of the account prefix in the Czech BBAN.
   */
  ACCOUNT_LENGTH,
  /**
   * Length of the account number in the Czech BBAN.
   */
  ACCOUNT_PREFIX_LENGTH,
});

// Register as a parser to the common BBAN parser registry
BBAN.parsers.set('CZ' as countryCode, BBAN_CZ.parse);
