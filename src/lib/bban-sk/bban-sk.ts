import type { Tagged } from 'type-fest';
import { BBAN } from '../bban/bban';
import type { bban } from '../bban/bban';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType } from '../utils';

// Public SK BBAN constants --------------------------------------------
const BANK_CODE_LENGTH = 4;

const ACCOUNT_LENGTH = 16;

const TYPE_LENGTH = BANK_CODE_LENGTH + ACCOUNT_LENGTH;

class BBAN_SK_TypeError extends BBAN.TypeError {}

export type bban_sk = Tagged<bban, 'bban_sk'>;

export interface BBAN_SK_Components {
  bankCode: string;
  accountNumber: string;
}

export const BBAN_SK = declareTaggedType({
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
  isTypeof: (input: unknown): input is bban_sk => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[0-9]{${TYPE_LENGTH}}$`).test(input)
    );
  },

  parse: BBAN.createParser<bban_sk, BBAN_SK_Components>(
    `(?<bankCode>\d{${BANK_CODE_LENGTH}})(?<accountNumber>\d{${ACCOUNT_LENGTH}})`,
  ),

  from: (components: BBAN_SK_Components): bban_sk => {
    const bankCode = components.bankCode.padStart(BANK_CODE_LENGTH, '0');
    const accountNumber = components.accountNumber.padStart(
      ACCOUNT_LENGTH,
      '0',
    );

    return `${bankCode}${accountNumber}` as bban_sk;
  },

  TypeError: BBAN_SK_TypeError,
  /**
   * Overall length of the German BBAN.
   */
  TYPE_LENGTH,
  /**
   * Length of the bank code in the German BBAN.
   */
  BANK_CODE_LENGTH,
  /**
   * Length of the account prefix in the German BBAN.
   */
  ACCOUNT_LENGTH,
});

// Register as a parser to the common BBAN parser registry
BBAN.parsers.set('SK' as countryCode, BBAN_SK.parse);
