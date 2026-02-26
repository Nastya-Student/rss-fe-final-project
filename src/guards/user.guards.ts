import { User } from "../interfaces/user.interface.js";
import { hasNumberProp, hasStringProp } from "../utils/has-type-prop.js";

export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "id") &&
    hasStringProp(obj, "name") &&
    hasStringProp(obj, "email") &&
    hasStringProp(obj, "passwordHash") &&
    hasNumberProp(obj, "xp") &&
    hasNumberProp(obj, "streak") &&
    hasStringProp(obj, "createdAt")
  );
}

export function isUserArray(obj: unknown): obj is User[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isUser(item))
  );
}
