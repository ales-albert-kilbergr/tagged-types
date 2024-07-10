import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../utils';

// Public PT BBAN constants --------------------------------------------
const BANK_CODE_LENGTH = 4;

const BRANCH_CODE_LENGTH = 4;

const NATIONAL_CHECK_DIGIT_LENGTH = 2;

const ACCOUNT_LENGTH = 11;

const TYPE_LENGTH =
  BANK_CODE_LENGTH +
  BRANCH_CODE_LENGTH +
  NATIONAL_CHECK_DIGIT_LENGTH +
  ACCOUNT_LENGTH;

class BBAN_PT_TypeError extends BBAN.TypeError {}

export type bban_pt = Tagged<bban, 'bban_pt'>;

export interface BBAN_PT_Components {
  bankCode: string;
  branchCode: string;
  nationalCheckDigit: string;
  accountNumber: string;
}

export const BBAN_PT = declareTaggedType({
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
   * Checks if the input is a valid Portuguese BBAN. Method can be used as a type guard.
   *
   * @param input
   * @returns
   */
  isTypeof: (input: unknown): input is bban_pt => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },

  parse: BBAN.createParser<bban_pt, BBAN_PT_Components>(
    `(?<bankCode>\d{${BANK_CODE_LENGTH}})(?<branchCode>\d{${BRANCH_CODE_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})(?<nationalCheckDigit>\d{${NATIONAL_CHECK_DIGIT_LENGTH}})`,
  ),

  from: (components: BBAN_PT_Components): bban_pt => {
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

    return `${bankCode}${branchCode}${accountNumber}${nationalCheckDigit}` as bban_pt;
  },

  TypeError: BBAN_PT_TypeError,
  /**
   * Overall length of the Portuguese BBAN.
   */
  TYPE_LENGTH,
  /**
   * Length of the bank code in the Portuguese BBAN.
   */
  BANK_CODE_LENGTH,
  /**
   * Length of the account prefix in the Portuguese BBAN.
   */
  ACCOUNT_LENGTH,

  BRANCH_CODE_LENGTH,

  NATIONAL_CHECK_DIGIT_LENGTH,
});

// Register as a parser to the common BBAN parser registry
BBAN.parsers.set('PT' as countryCode, BBAN_PT.parse);
