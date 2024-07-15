import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../tagged-type/tagged-type';

// Public PL BBAN constants --------------------------------------------
const BANK_CODE_LENGTH = 3;

const BRANCH_CODE_LENGTH = 4;

const NATIONAL_CHECK_DIGIT_LENGTH = 1;

const ACCOUNT_LENGTH = 16;

const TYPE_LENGTH =
  BANK_CODE_LENGTH +
  BRANCH_CODE_LENGTH +
  NATIONAL_CHECK_DIGIT_LENGTH +
  ACCOUNT_LENGTH;

class BBAN_PL_TypeError extends BBAN.TypeError {}

export type bban_pl = Tagged<bban, 'bban_pl'>;

export interface BBAN_PL_Components {
  bankCode: string;
  branchCode: string;
  nationalCheckDigit: string;
  accountNumber: string;
}

export const BBAN_PL = declareTaggedType({
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
  isTypeof: (input: unknown): input is bban_pl => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },

  parse: BBAN.createParser<bban_pl, BBAN_PL_Components>(
    `(?<bankCode>\d{${BANK_CODE_LENGTH}})(?<branchCode>\d{${BRANCH_CODE_LENGTH}})(?<nationalCheckDigit>\d{${NATIONAL_CHECK_DIGIT_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})`,
  ),

  from: (components: BBAN_PL_Components): bban_pl => {
    const bankCode = components.bankCode.padStart(BANK_CODE_LENGTH, '0');
    const branchCode = components.branchCode.padStart(BRANCH_CODE_LENGTH, '0');
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    const nationalCheckDigit = components.nationalCheckDigit;
    const accountNumber = components.accountNumber.padStart(
      ACCOUNT_LENGTH,
      '0',
    );

    return `${bankCode}${branchCode}${nationalCheckDigit}${accountNumber}` as bban_pl;
  },

  TypeError: BBAN_PL_TypeError,
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
BBAN.parsers.set('PL' as countryCode, BBAN_PL.parse);
