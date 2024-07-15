import isCurrencyCode from 'validator/lib/isISO4217';
import { declareTaggedType, TaggedTypeError } from '../tagged-type/tagged-type';
// prettier-ignore
export type currencyCode = | 
  'AED' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'ARS' | 'AUD' | 'AWG' | 'AZN' |
  'BAM' | 'BBD' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BOV' | 'BRL' | 'BSD' | 'BTN' | 'BWP' | 'BYN' | 'BZD' |
  'CAD' | 'CDF' | 'CHE' | 'CHF' | 'CHW' | 'CLF' | 'CLP' | 'CNY' | 'COP' | 'COU' | 'CRC' | 'CUP' | 'CVE' | 'CZK' |
  'DJF' | 'DKK' | 'DOP' | 'DZD' |
  'EGP' | 'ERN' | 'ETB' | 'EUR' |
  'FJD' | 'FKP' |
  'GBP' | 'GEL' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' |
  'HKD' | 'HNL' | 'HTG' | 'HUF' |
  'IDR' | 'ILS' | 'INR' | 'IQD' | 'IRR' | 'ISK' |
  'JMD' | 'JOD' | 'JPY' |
  'KES' | 'KGS' | 'KHR' | 'KMF' | 'KPW' | 'KRW' | 'KWD' | 'KYD' | 'KZT' |
  'LAK' | 'LBP' | 'LKR' | 'LRD' | 'LSL' | 'LYD' |
  'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MMK' | 'MNT' | 'MOP' | 'MRU' | 'MUR' | 'MVR' | 'MWK' | 'MXN' | 'MXV' | 'MYR' | 'MZN' |
  'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' |
  'OMR' |
  'PAB' | 'PEN' | 'PGK' | 'PHP' | 'PKR' | 'PLN' | 'PYG' |
  'QAR' |
  'RON' | 'RSD' | 'RUB' | 'RWF' |
  'SAR' | 'SBD' | 'SCR' | 'SDG' | 'SEK' | 'SGD' | 'SHP' | 'SLE' | 'SLL' | 'SOS' | 'SRD' | 'SSP' | 'STN' | 'SVC' | 'SYP' | 'SZL' |
  'THB' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TWD' | 'TZS' |
  'UAH' | 'UGX' | 'USD' | 'USN' | 'UYI' | 'UYU' | 'UYW' | 'UZS' |
  'VED' | 'VES' | 'VND' | 'VUV' |
  'WST' |
  'XAF' | 'XAG' | 'XAU' | 'XBA' | 'XBB' | 'XBC' | 'XBD' | 'XCD' | 'XDR' | 'XOF' | 'XPD' | 'XPF' | 'XPT' | 'XSU' | 'XTS' | 'XUA' | 'XXX' |
  'YER' |
  'ZAR' | 'ZMW' | 'ZWL';

export const CurrencyCode = declareTaggedType({
  /**
   * Sanitize the input before being cast to the currency code type.
   * In case of input being string, it will be converted to uppercase.
   *
   * @param input
   * @returns
   */
  sanitize: (input: unknown): unknown => {
    return typeof input === 'string' ? input.toUpperCase() : input;
  },
  /**
   * Check if the input is a valid currency code.
   *
   * @param input
   * @returns
   */
  isTypeof: (input: unknown): input is currencyCode => {
    return typeof input === 'string' && isCurrencyCode(input);
  },
  /**
   * The error to be thrown when the input is not a valid currency code.
   */
  TypeError: class CurrencyCodeTypeError extends TaggedTypeError(
    'currencyCode',
  ) {},

  CURRENCY_CODE_LENGTH: 3,
});
