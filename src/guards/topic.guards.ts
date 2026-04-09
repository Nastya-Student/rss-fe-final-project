import { Topic } from "../interfaces/topic.interface.js";
import { hasNumberProp, hasStringProp } from "../utils/has-type-prop.js";
import { isStringArray } from "../utils/is-type-array.js";

export function isTopic(obj: unknown): obj is Topic {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "id") &&
    hasStringProp(obj, "title") &&
    hasStringProp(obj, "description") &&
    hasNumberProp(obj, "difficulty") &&
    "tags" in obj &&
    isStringArray(obj.tags) &&
    "widgetIds" in obj &&
    isStringArray(obj.widgetIds)
  );
}

export function isTopicArray(obj: unknown): obj is Topic[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isTopic(item))
  );
}
