import BICBankCodeType, {
  BIC_BANK_CODE_LENGTH,
} from '../bic-bank-code/bic-bank-code';
import type { bicBankCode } from '../bic-bank-code/bic-bank-code';
import BICBranchCodeType, {
  BIC_BRANCH_CODE_LENGTH,
} from '../bic-branch-code/bic-branch-code';
import type { bicBranchCode } from '../bic-branch-code/bic-branch-code';
import type { bicLocationCode } from '../bic-location-code/bic-location-code';
import BICLocationCodeType, {
  BIC_LOCATION_CODE_LENGTH,
} from '../bic-location-code/bic-location-code';
import type { bic, BICComponents } from '../bic/bic';
import BICType from '../bic/bic';
import { countryCodeStub } from './country-code.stub';
import { stringStub } from './string.stub';

/**
 * Generates a random BIC branch code.
 */
export function bicBranchCodeStub(): bicBranchCode {
  return BICBranchCodeType(stringStub(BIC_BRANCH_CODE_LENGTH).toUpperCase());
}
/**
 * Generates a random BIC bank code.
 */
export function bicBankCodeStub(): bicBankCode {
  return BICBankCodeType(stringStub(BIC_BANK_CODE_LENGTH));
}

export function bicLocationCodeStub(): bicLocationCode {
  return BICLocationCodeType(
    stringStub(BIC_LOCATION_CODE_LENGTH).toUpperCase(),
  );
}

export function bicStub(overrides: Partial<BICComponents> = {}): bic {
  return BICType.from({
    bankCode: bicBankCodeStub(),
    countryCode: countryCodeStub(),
    locationCode: bicLocationCodeStub(),
    branchCode: bicBranchCodeStub(),
    ...overrides,
  });
}
