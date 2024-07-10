export const ALPHABETICAL_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const ALPHANUMERIC_CHARS = ALPHABETICAL_CHARS + '0123456789';

const MIN_DEFAULT_LENGTH = 3;

const MAX_DEFAULT_LENGTH = 10;

/**
 * Generates a random testing string. This method is not cryptographically safe
 * and is only good to be used in testing not in real code.
 *
 * @param length  The length of the string to generate.
 * @returns random urn
 */
export function stringStub(
  length: number = MIN_DEFAULT_LENGTH +
    Math.floor(Math.random() * MAX_DEFAULT_LENGTH),
  characterSet = ALPHANUMERIC_CHARS,
): string {
  let result = '';
  const charactersLength = characterSet.length;
  for (let i = 0; i < length; i++) {
    result += characterSet.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
/**
 * Generates aplhabetical character
 *
 * @returns
 */
export function alphabeticalCharStub(): string {
  const characters = ALPHABETICAL_CHARS;
  const charactersLength = characters.length;

  const character = characters.charAt(
    Math.floor(Math.random() * charactersLength),
  );

  return character;
}
