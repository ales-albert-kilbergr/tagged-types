// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function TaggedTypeError(typeName: string, typeDescription = '') {
  return class extends TypeError {
    public constructor(input: unknown, failedAction = '') {
      super(
        `${failedAction} The input ${String(input)} is not a valid "${typeName}". ${typeDescription}`.trim(),
      );
    }
  };
}

export type TaggedType<
  TYPE,
  TYPE_ERROR extends TypeError,
  EXTRA extends object,
> = {
  (input: unknown): TYPE;
  isTypeof: (input: unknown) => input is TYPE;
  assert: (input: unknown) => void;
  // FIXME: Assertions require every name in the call target to be declared
  // with an explicit type annotation.
  //assert: (input: unknown) => asserts input is TYPE;
  TypeError: new (input: unknown) => TYPE_ERROR;
} & EXTRA;

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace declareTaggedType {
  export type Params<
    TYPE,
    TYPE_ERROR extends TypeError = TypeError,
    EXTRA extends object = object,
  > = {
    isTypeof: (input: unknown) => input is TYPE;
    sanitize?: (input: unknown) => unknown;
    TypeError: new (input: unknown) => TYPE_ERROR;
  } & {
    [K in keyof EXTRA]: EXTRA[K];
  };
}

export function declareTaggedType<
  TYPE,
  TYPE_ERROR extends TypeError = TypeError,
  EXTRA extends object = object,
>({
  isTypeof,
  TypeError,
  sanitize,
  ...extra
}: declareTaggedType.Params<TYPE, TYPE_ERROR, EXTRA>): TaggedType<
  TYPE,
  TYPE_ERROR,
  EXTRA
> {
  const assert = (input: unknown): void => {
    if (!isTypeof(input)) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new TypeError(input);
    }
  };

  const cast = (input: unknown): TYPE => {
    const sanitizedInput = sanitize ? sanitize(input) : input;
    assert(sanitizedInput);

    return sanitizedInput as TYPE;
  };

  return Object.assign(
    cast,
    {
      isTypeof,
      assert,
      TypeError,
    },
    extra,
  ) as TaggedType<TYPE, TYPE_ERROR, EXTRA>;
}
