export function isStringArray(obj: unknown): obj is string[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => typeof item === "string")
  );
}

export function isNumberArray(obj: unknown): obj is number[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => typeof item === "number")
  );
}

export function isBooleanArray(obj: unknown): obj is boolean[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => typeof item === "boolean")
  );
}
