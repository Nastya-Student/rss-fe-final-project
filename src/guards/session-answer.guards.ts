import { SessionAnswer } from "../interfaces/session-answer.interface.js";
import {
  hasBooleanProp,
  hasNumberProp,
  hasStringProp,
} from "../utils/has-type-prop.js";

export function isSessionAnswer(obj: unknown): obj is SessionAnswer {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "widgetId") &&
    hasBooleanProp(obj, "isCorrect") &&
    hasNumberProp(obj, "timeSpent")
  );
}

export function isSessionAnswerArray(obj: unknown): obj is SessionAnswer[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isSessionAnswer(item))
  );
}
