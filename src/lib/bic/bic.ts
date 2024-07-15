/**
 * @module bic
 * @description BIC (Bank Identifier Code) type. This module defines BIC as a
 *   string subtype and exposes methods to work with it.
 */
import type { Tagged } from 'type-fest';
import isBIC from 'validator/lib/isBIC';
import { declareTaggedType, TaggedTypeError } from '../tagged-type/tagged-type';
import { BICBankCode, type bicBankCode } from '../bic-bank-code/bic-bank-code';
import { CountryCode, type countryCode } from '../country-code/country-code';
import {
  BICLocationCode,
  type bicLocationCode,
} from '../bic-location-code/bic-location-code';
import {
  BICBranchCode,
  type bicBranchCode,
} from '../bic-branch-code/bic-branch-code';

export type bic = Tagged<string, 'bic'>;

export interface BICComponents {
  readonly bankCode: bicBankCode;
  readonly countryCode: countryCode;
  readonly locationCode: bicLocationCode;
  readonly branchCode?: bicBranchCode; // Optional since not all BIC codes have a branch code
}

class BICTypeError extends TaggedTypeError('bic') {}

export const BIC = declareTaggedType({
  /**
   * Sanitize the input before being cast to the BIC type.
   * In case of input being string, it will be converted to uppercase.
   */
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string'
      ? input.toUpperCase().replace(/\s/g, '')
      : input;
  },
  /**
   * Check if the input is a valid BIC. Method can be used as a type guard.
   *
   * @param input
   * @returns boolean - true if the input is a valid BIC
   */
  isTypeof: (input: unknown): input is bic => {
    return typeof input === 'string' && isBIC(input);
  },

  parse: (input: bic): BICComponents => {
    const bankCodeLength = BICBankCode.TYPE_LENGTH;
    const countryCodeLength = CountryCode.TYPE_LENGTH;
    const locationCodeLength = BICLocationCode.TYPE_LENGTH;
    const branchCodeLength = BICBranchCode.TYPE_LENGTH;

    const rx = new RegExp(
      `(?<bankCode>[A-Z]{${bankCodeLength}})(?<countryCode>[A-Z]{${countryCodeLength}})(?<locationCode>[A-Z0-9]{${locationCodeLength}})(?<branchCode>[A-Z0-9]{0,${branchCodeLength}})`,
    );
    const groups = rx.exec(input)?.groups;

    /* istanbul ignore next */
    if (!groups) {
      throw new BICTypeError(input);
    }

    return groups as unknown as BICComponents;
  },

  from({
    bankCode,
    countryCode,
    locationCode,
    branchCode,
  }: BICComponents): bic {
    return `${bankCode}${countryCode}${locationCode}${branchCode ?? ''}` as bic;
  },

  /**
   * An error is thrown if the input is not a valid BIC.
   */
  TypeError: BICTypeError,

  BIC_MIN_LENGTH:
    BICBankCode.TYPE_LENGTH +
    CountryCode.TYPE_LENGTH +
    BICLocationCode.TYPE_LENGTH,

  BIC_MAX_LENGTH:
    BICBankCode.TYPE_LENGTH +
    CountryCode.TYPE_LENGTH +
    BICLocationCode.TYPE_LENGTH +
    BICBranchCode.TYPE_LENGTH,
});
