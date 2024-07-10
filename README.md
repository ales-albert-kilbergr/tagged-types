# Tagged types

The library implements various string sub-type helpers. They might be useful for
cases when we want type safety for emails, URLs, BICs, IBANs or other string types.
Each subtype module exposes the type and a set of basic functions to work with it,
like `cast`, `isTypeof` and `assert`.

Some subtypes are primitive in the sense that they only represent a string such as a top-level domain or a UUID. Some others are a composition of multiple information like a BIC code.

We will try to provide additional methods to the complex types called `parse` and `from` to break them down or build them up from their components.

### Supported types

**Finance:**

- [BIC](#bic)
- [BIC Bank Code](#bic-bank-code)
- [BIC Branch Code](#bic-branch-code)
- [BIC Location Code](#bic-location-code)
- [Currency Code](#currency-code)
- [IBAN](#iban)

**Network**

- [Email](#email)
- [JWT](#jwt)
- [TLD](#tld)
- [URL](#url)

**Common:**

- [Country Code](#country-code)
- [UUID](#uuid)

## Types

### BIC

Import:

```typescript
import { BICType } from '@kilbergr/tagged-types/bic';
import type { BIC } from '@kilbergr/tagged-types/bic';
```

Cast string to BIC (Can throw `BICTypeError`):

```typescript
const bic: BIC = BICType('DEUTDEFF500');
```

Check if a string is BIC. Can act as a type guard:

```typescript
if (BICType.isTypeof(bic)) {
  ...
}
```

Assert a string is BIC. Throws `BICTypeError` if a string is not BIC

```typescript
BICType.assert(bic);
```

Parse a BIC string:

```typescript
const { bankCode, branchCode, locationCode, countryCode } = BICType.parse(bic);
```

Build a BIC string:

```typescript
const bic: BIC = BICType.from({
  bankCode,
  branchCode,
  locationCode,
  countryCode,
});
```

Manually access the type error constructor:

```typescript
BICType.TypeError;
```

### BIC Bank Code

Import:

```typescript
import { BICBankCodeType } from '@kilbergr/tagged-types/bic-bank-code';
import type { BICBankCode } from '@kilbergr/tagged-types/bic-bank-code';
```

Cast string to BICBankCode (Can throw `BICBankCodeTypeError`):

```typescript
const bicBankCode: BICBankCode = BICBankCodeType('DEUT');
```

Check if a string is BICBankCode. Can act as a type guard:

```typescript
if (BICBankCodeType.isTypeof(bicBankCode)) {
  ...
}
```

Assert a string is BICBankCode. Throws `BICBankCodeTypeError` if a string is not BICBankCode

```typescript
BICBankCodeType.assert(bicBankCode);
```

Manually access the type error constructor:

```typescript
BICBankCodeType.TypeError;
```

### BIC Branch Code

Import:

```typescript
import { BICBranchCodeType } from '@kilbergr/tagged-types/bic-branch-code';
import type { BICBranchCode } from '@kilbergr/tagged-types/bic-branch-code';
```

Cast string to BICBranchCode (Can throw `BICBranchCodeTypeError`):

```typescript
const bicBranchCode: BICBranchCode = BICBranchCodeType('DEUT');
```

Check if a string is BICBranchCode. Can act as a type guard:

```typescript
if (BICBranchCodeType.isTypeof(bicBranchCode)) {
  ...
}
```

Assert a string is BICBranchCode. Throws `BICBranchCodeTypeError` if a string is not BICBranchCode

```typescript
BICBranchCodeType.assert(bicBranchCode);
```

Manually access the type error constructor:

```typescript
BICBranchCodeType.TypeError;
```

### BIC Location Code

Import:

```typescript
import { BICLocationCodeType } from '@kilbergr/tagged-types/bic-location-code';
import type { BICLocationCode } from '@kilbergr/tagged-types/bic-location-code';
```

Cast string to BICLocationCode (Can throw `BICLocationCodeTypeError`):

```typescript
const bicLocationCode: BICLocationCode = BICLocationCodeType('DEUT');
```

Check if a string is BICLocationCode. Can act as a type guard:

```typescript
if (BICLocationCodeType.isTypeof(bicLocationCode)) {
  ...
}
```

Assert a string is BICLocationCode. Throws `BICLocationCodeTypeError` if a string is not BICLocationCode

```typescript
BICLocationCodeType.assert(bicLocationCode);
```

Manually access the type error constructor:

```typescript
BICLocationCodeType.TypeError;
```

## Country Code

Import:

```typescript
import { CountryCodeType } from '@kilbergr/tagged-types/country-code';
import type { CountryCode } from '@kilbergr/tagged-types/country-code';
```

Cast string to CountryCode (Can throw `CountryCodeTypeError`):

```typescript
const countryCode: CountryCode = CountryCodeType('DE');
```

Check if a string is CountryCode. Can act as a type guard:

```typescript
if (CountryCodeType.isTypeof(countryCode)) {
  ...
}
```

Assert a string is CountryCode. Throws `CountryCodeTypeError` if a string is not CountryCode

```typescript
CountryCodeType.assert(countryCode);
```

Manually access the type error constructor:

```typescript
CountryCodeType.TypeError;
```

### Currency Code

Import:

```typescript
import { CurrencyCodeType } from '@kilbergr/tagged-types/currency-code';
import type { CurrencyCode } from '@kilbergr/tagged-types/currency-code';
```

Cast string to CurrencyCode (Can throw `CurrencyCodeTypeError`):

```typescript
const currencyCode: CurrencyCode = CurrencyCodeType('EUR');
```

Check if a string is CurrencyCode. Can act as a type guard:

```typescript
if (CurrencyCodeType.isTypeof(currencyCode)) {
  ...
}
```

Assert a string is CurrencyCode. Throws `CurrencyCodeTypeError` if a string is not CurrencyCode

```typescript
CurrencyCodeType.assert(currencyCode);
```

Manually access the type error constructor:

```typescript
CurrencyCodeType.TypeError;
```

### Email

Import:

```typescript
import { EmailType } from '@kilbergr/tagged-types/email';
import type { Email } from '@kilbergr/tagged-types/email';
```

Cast string to Email (Can throw `EmailTypeError`):

```typescript
const email: Email = EmailType('john.doe@example.com');
```

Check if a string is Email. Can act as a type guard:

```typescript
if (EmailType.isTypeof(email)) {
  ...
}
```

Assert a string is Email. Throws `EmailTypeError` if a string is not Email

```typescript
EmailType.assert(email);
```

Manually access the type error constructor:

```typescript
EmailType.TypeError;
```

### IBAN

Import:

```typescript
import { IBANType } from '@kilbergr/tagged-types/iban';
import type { IBAN } from '@kilbergr/tagged-types/iban';
```

Cast string to IBAN (Can throw `IBANTypeError`):

```typescript
const iban: IBAN = IBANType('DE89370400440532013000');
```

Check if a string is IBAN. Can act as a type guard:

```typescript
if (IBANType.isTypeof(iban)) {
  ...
}
```

Assert a string is IBAN. Throws `IBANTypeError` if a string is not IBAN

```typescript
IBANType.assert(iban);
```

### JWT

Import:

```typescript
import { JWTType } from '@kilbergr/tagged-types/jwt';
import type { JWT } from '@kilbergr/tagged-types/jwt';
```

Cast string to JWT (Can throw `JWTTypeError`):

```typescript
const jwt: JWT = JWTType('...');
```

Check if a string is JWT. Can act as a type guard:

```typescript
if (JWTType.isTypeof(jwt)) {
  ...
}
```

Assert a string is JWT. Throws `JWTTypeError` if a string is not JWT

```typescript
JWTType.assert(jwt);
```

Manually access the type error constructor:

```typescript
JWTType.TypeError;
```

### TLD

Import:

```typescript
import { TLDType } from '@kilbergr/tagged-types/tld';
import type { TLD } from '@kilbergr/tagged-types/tld';
```

Cast string to TLD (Can throw `TLDTypeError`):

```typescript
const tld: TLD = TLDType('com');
```

Check if a string is TLD. Can act as a type guard:

```typescript
if (TLDType.isTypeof(tld)) {
  ...
}
```

Assert a string is TLD. Throws `TLDTypeError` if a string is not TLD

```typescript
TLDType.assert(tld);
```

Manually access the type error constructor:

```typescript
TLDType.TypeError;
```

## Testing

This library also provides the methods to generate valid stubs for some of the types above.

Example (random BIC):

```typescript
import { stubBIC } from '@kilbergr/tagged-types/testing';

const randomBIC: BIC = stubBIC();

// random bic with specific country code
const randomBIC: BIC = stubBIC({
  countryCode: 'DE',
});
```

Example (Random Email):

```typescript
import { stubEmail } from '@kilbergr/tagged-types/testing';

const randomEmail: Email = stubEmail();
```

Example (Random email with display name):

```typescript
import { stubEmail } from '@kilbergr/tagged-types/testing';

const randomEmail: Email = stubEmailWithDisplayName();
```
