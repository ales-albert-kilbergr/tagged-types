import EmailWithDisplayNameType from '../email-with-display-name/email-with-display-name';
import EmailType from '../email/email';
import type { EmailWithDisplayName } from '../email-with-display-name/email-with-display-name';
import type { email } from '../email/email';
import { stringStub } from './string.stub';

const EMAIL_NAME_DEFAULT_LENGTH = 12;

const EMAIL_LOCAL_DEFAULT_LENGTH = 6;

export interface EmailStubOptions {
  readonly domain?: string;
  readonly local?: string;
  readonly name?: string;
}
export function emailWithDisplayNameStub(
  o?: EmailStubOptions,
): EmailWithDisplayName {
  const name = o?.name ?? stringStub(EMAIL_NAME_DEFAULT_LENGTH);
  const local = o?.local ?? stringStub(EMAIL_LOCAL_DEFAULT_LENGTH);
  const domain = o?.domain ?? `example.com`;
  return EmailWithDisplayNameType(`${name} <${local}@${domain}>`);
}

export function emailStub(o?: EmailStubOptions): email {
  const local = o?.local ?? stringStub(EMAIL_LOCAL_DEFAULT_LENGTH);
  const domain = o?.domain ?? `example.com`;
  return EmailType(`${local}@${domain}`);
}
