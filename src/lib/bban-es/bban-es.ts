import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../tagged-type/tagged-type';

// Public ES BBAN constants --------------------------------------------
const BANK_CODE_LENGTH = 4;

const BRANCH_CODE_LENGTH = 4;

const NATIONAL_CHECK_DIGIT_LENGTH = 2;

const ACCOUNT_LENGTH = 10;

const TYPE_LENGTH =
  BANK_CODE_LENGTH +
  BRANCH_CODE_LENGTH +
  NATIONAL_CHECK_DIGIT_LENGTH +
  ACCOUNT_LENGTH;

class BBAN_ES_TypeError extends BBAN.TypeError {}

export type bban_es = Tagged<bban, 'bban_es'>;

export interface BBAN_ES_Components {
  bankCode: string;
  branchCode: string;
  nationalCheckDigit: string;
  accountNumber: string;
}

export const BBAN_ES = declareTaggedType({
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
   * Checks if the input is a valid Spanish BBAN. Method can be used as a type guard.
   *
   * @param input
   * @returns
   */
  isTypeof: (input: unknown): input is bban_es => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },

  parse: BBAN.createParser<bban_es, BBAN_ES_Components>(
    `(?<bankCode>\d{${BANK_CODE_LENGTH}})(?<branchCode>\d{${BRANCH_CODE_LENGTH}})(?<nationalCheckDigit>\d{${NATIONAL_CHECK_DIGIT_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})`,
  ),

  from: (components: BBAN_ES_Components): bban_es => {
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

    return `${bankCode}${branchCode}${nationalCheckDigit}${accountNumber}` as bban_es;
  },

  TypeError: BBAN_ES_TypeError,
  /**
   * Overall length of the Spanish BBAN.
   */
  TYPE_LENGTH,
  /**
   * Length of the bank code in the Spanish BBAN.
   */
  BANK_CODE_LENGTH,
  /**
   * Length of the account prefix in the Spanish BBAN.
   */
  ACCOUNT_LENGTH,

  BRANCH_CODE_LENGTH,

  NATIONAL_CHECK_DIGIT_LENGTH,
});

// Register as a parser to the common BBAN parser registry
BBAN.parsers.set('ES' as countryCode, BBAN_ES.parse);
