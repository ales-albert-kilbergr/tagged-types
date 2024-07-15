import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../tagged-type/tagged-type';

// Public PT BBAN constants --------------------------------------------
const BANK_CODE_LENGTH = 4;

const BRANCH_CODE_LENGTH = 4;

const ACCOUNT_LENGTH = 12;

const TYPE_LENGTH = BANK_CODE_LENGTH + BRANCH_CODE_LENGTH + ACCOUNT_LENGTH;

class BBAN_AD_TypeError extends BBAN.TypeError {}

export type bban_ad = Tagged<bban, 'bban_ad'>;

export interface BBAN_AD_Components {
  bankCode: string;
  branchCode: string;
  nationalCheckDigit: string;
  accountNumber: string;
}

export const BBAN_AD = declareTaggedType({
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
   * Checks if the input is a valid Andorran BBAN. Method can be used as a type guard.
   *
   * @param input
   * @returns
   */
  isTypeof: (input: unknown): input is bban_ad => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },

  parse: BBAN.createParser<bban_ad, BBAN_AD_Components>(
    `(?<bankCode>\d{${BANK_CODE_LENGTH}})(?<branchCode>\d{${BRANCH_CODE_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})`,
  ),

  from: (components: BBAN_AD_Components): bban_ad => {
    const bankCode = components.bankCode.padStart(BANK_CODE_LENGTH, '0');
    const branchCode = components.branchCode.padStart(BRANCH_CODE_LENGTH, '0');
    const accountNumber = components.accountNumber.padStart(
      ACCOUNT_LENGTH,
      '0',
    );

    return `${bankCode}${branchCode}${accountNumber}` as bban_ad;
  },

  TypeError: BBAN_AD_TypeError,
  /**
   * Overall length of the Andorran BBAN.
   */
  TYPE_LENGTH,
  /**
   * Length of the bank code in the Andorran BBAN.
   */
  BANK_CODE_LENGTH,
  /**
   * Length of the account prefix in the Andorran BBAN.
   */
  ACCOUNT_LENGTH,

  BRANCH_CODE_LENGTH,
});

// Register as a parser to the common BBAN parser registry
BBAN.parsers.set('AD' as countryCode, BBAN_AD.parse);
