export function hasStringProp(
  obj: unknown,
  key: string,
): obj is Record<string, unknown> & { [K in typeof key]: string } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    key in obj &&
    typeof (obj as Record<string, unknown>)[key] === "string"
  );
}

export function hasNumberProp(
  obj: unknown,
  key: string,
): obj is Record<string, unknown> & { [K in typeof key]: number } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    key in obj &&
    typeof (obj as Record<string, unknown>)[key] === "number"
  );
}

export function hasBooleanProp(
  obj: unknown,
  key: string,
): obj is Record<string, unknown> & { [K in typeof key]: boolean } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    key in obj &&
    typeof (obj as Record<string, unknown>)[key] === "boolean"
  );
}
