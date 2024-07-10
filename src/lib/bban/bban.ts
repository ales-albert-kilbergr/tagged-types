/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Tagged } from 'type-fest';
import type { countryCode } from '../country-code/country-code';
import { declareTaggedType, TaggedTypeError } from '../utils';
import type { BBAN_CZ_Components } from '../bban-cz/bban-cz';
import type { BBAN_DE_Components } from '../bban-de/bban-de';
import type { BBAN_AT_Components } from '../bban-at/bban-at';
import type { BBAN_PL_Components } from '../bban-pl/bban-pl';
import type { BBAN_SK_Components } from '../bban-sk/bban-sk';
import type { BBAN_HU_Components } from '../bban-hu/bban-hu';
import type { BBAN_FR_Components } from '../bban-fr/bban-fr';
import type { BBAN_ES_Components } from '../bban-es/bban-es';
import type { BBAN_PT_Components } from '../bban-pt/bban-pt';
import type { BBAN_AD_Components } from '../bban-ad/bban-ad';

// Public BBAN constants --------------------------------------------
const MAX_LENGTH = 30;
const MIN_LENGTH = 1;
const parsers = new Map<countryCode, (bban: any) => object>();

// public BBAN types ------------------------------------------------
/**
 * Expose the BBAN string subtype.
 */
export type bban = Tagged<string, 'bban'>;
// overloads
function parse(countryCode: 'AD', input: any): BBAN_AD_Components;
function parse(countryCode: 'AT', input: any): BBAN_AT_Components;
function parse(countryCode: 'CZ', input: any): BBAN_CZ_Components;
function parse(countryCode: 'DE', input: any): BBAN_DE_Components;
function parse(countryCode: 'ES', input: any): BBAN_ES_Components;
function parse(countryCode: 'FR', input: any): BBAN_FR_Components;
function parse(countryCode: 'HU', input: any): BBAN_HU_Components;
function parse(countryCode: 'PL', input: any): BBAN_PL_Components;
function parse(countryCode: 'SK', input: any): BBAN_SK_Components;
function parse(countryCode: 'PT', input: any): BBAN_PT_Components;
// implementation
function parse(countryCode: countryCode, input: any): object {
  const parser = parsers.get(countryCode);

  if (!parser) {
    throw new TypeError(
      `No BBAN parser found for the country code ${countryCode}. ` +
        `Import a parser @kilbergr/tagged-type/bban-${countryCode.toLowerCase()}`,
    );
  }

  return parser(input);
}

function createParser<I, T>(regExpStr: string) {
  return (input: I): T => {
    const rx = new RegExp(regExpStr);

    if (typeof input !== 'string') {
      throw new TypeError(
        `The input ${String(input)} is not a valid BBAN. Must be a string.`,
      );
    }

    const groups = rx.exec(input)?.groups;

    if (!groups) {
      throw new TypeError(
        `Failed to parse the BBAN ${input}. Is the RegExp correct?`,
      );
    }

    return groups as T;
  };
}

export const BBAN = declareTaggedType({
  /**
   * Sanitize the input by converting it to uppercase if the input is a string.
   * @param input
   * @returns the input converted to uppercase if it is a string
   */
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string'
      ? input.toUpperCase().replace(/\s/g, '')
      : input;
  },
  /**
   *
   */
  isTypeof: (input: unknown): input is bban => {
    return (
      typeof input === 'string' &&
      new RegExp(`^[A-Z0-9]{${MIN_LENGTH},${MAX_LENGTH}}$`).test(input)
    );
  },
  /**
   * Parse the BBAN into its components.
   */
  parse,

  createParser,

  TypeError: class BBANTypeError extends TaggedTypeError('bban') {},

  parsers,

  MIN_LENGTH,

  MAX_LENGTH,
});
