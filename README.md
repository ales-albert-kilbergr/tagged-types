# Tagged types

The library implements various string sub-type helpers. They might be useful for
cases when we want type safety for emails, URLs, BICs, IBANs or other string types.
Each subtype module exposes the type and a set of basic functions to work with it,
like `cast`, `isTypeof` and `assert`.

The package is organized into submodules, each can be imported separately.

### Installation

**npm**

```bash
npm install @kilbergr/tagged-types
```

**yarn**

```bash
yarn add @kilbergr/tagged-types
```

### Importing

```typescript
import { BIC, type bic } from '@kilbergr/tagged-types/bic';
import { Email, type email } from '@kilbergr/tagged-types/email';
```

### Usage

```typescript
// Use the type in your code
let myBic: bic;
let myEmail: email;

// Cast a string to the type
myBic = BIC('DEUTDEFF500');
myEmail = Email('john.doe@example.com');

// Check if a string is of the type
if (BIC.isTypeof(myBic)) {
  ...
}

if (Email.isTypeof(myEmail)) {
  ...
}

// Assert a string is of the type
BIC.assert(myBic);
Email.assert(myEmail);

```

Some string sub-types compose multiple information and implement `parse` and
`from` functions to work with them.

```typescript
const { bankCode, branchCode, locationCode, countryCode } = BIC.parse(myBic);
```
