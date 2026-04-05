import { PracticeSession } from "../interfaces/practice-session.interface.js";
import { hasNumberProp, hasStringProp } from "../utils/has-type-prop.js";
import { isSessionAnswerArray } from "./session-answer.guards.js";

export function isPracticeSession(obj: unknown): obj is PracticeSession {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "id") &&
    hasStringProp(obj, "userId") &&
    hasStringProp(obj, "topicId") &&
    hasStringProp(obj, "topicTitle") &&
    "answers" in obj &&
    isSessionAnswerArray(obj.answers) &&
    hasNumberProp(obj, "score") &&
    hasStringProp(obj, "startedAt") &&
    hasStringProp(obj, "completedAt")
  );
}

export function isPracticeSessionArray(obj: unknown): obj is PracticeSession[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isPracticeSession(item))
  );
}
