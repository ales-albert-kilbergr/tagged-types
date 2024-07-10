import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../utils';

// Public FR BBAN constants --------------------------------------------
const BANK_CODE_LENGTH = 5;

const BRANCH_CODE_LENGTH = 5;

const NATIONAL_CHECK_DIGIT_LENGTH = 2;

const ACCOUNT_LENGTH = 11;

const TYPE_LENGTH =
  BANK_CODE_LENGTH +
  BRANCH_CODE_LENGTH +
  NATIONAL_CHECK_DIGIT_LENGTH +
  ACCOUNT_LENGTH;

class BBAN_FR_TypeError extends BBAN.TypeError {}

export type bban_fr = Tagged<bban, 'bban_fr'>;

export interface BBAN_FR_Components {
  bankCode: string;
  branchCode: string;
  nationalCheckDigit: string;
  accountNumber: string;
}

export const BBAN_FR = declareTaggedType({
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
  isTypeof: (input: unknown): input is bban_fr => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },

  parse: BBAN.createParser<bban_fr, BBAN_FR_Components>(
    `(?<bankCode>\d{${BANK_CODE_LENGTH}})(?<branchCode>\d{${BRANCH_CODE_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})(?<nationalCheckDigit>\d{${NATIONAL_CHECK_DIGIT_LENGTH}})`,
  ),

  from: (components: BBAN_FR_Components): bban_fr => {
    const bankCode = components.bankCode.padStart(BANK_CODE_LENGTH, '0');
    const branchCode = components.branchCode.padStart(BRANCH_CODE_LENGTH, '0');
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    const nationalCheckDigit = components.nationalCheckDigit.padStart(
      NATIONAL_CHECK_DIGIT_LENGTH,
      '0',
    );
    const accountNumber = components.accountNumber.padStart(
      ACCOUNT_LENGTH,
      '0',
    );

    return `${bankCode}${branchCode}${accountNumber}${nationalCheckDigit}` as bban_fr;
  },

  TypeError: BBAN_FR_TypeError,
  /**
   * Overall length of the Czech BBAN.
   */
  TYPE_LENGTH,
  /**
   * Length of the bank code in the Czech BBAN.
   */
  BANK_CODE_LENGTH,
  /**
   * Length of the account prefix in the Czech BBAN.
   */
  ACCOUNT_LENGTH,

  BRANCH_CODE_LENGTH,

  NATIONAL_CHECK_DIGIT_LENGTH,
});

// Register as a parser to the common BBAN parser registry
BBAN.parsers.set('FR' as countryCode, BBAN_FR.parse);
