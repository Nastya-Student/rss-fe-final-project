import { TopicProgress } from "../interfaces/topic-progress.interface.js";
import { hasNumberProp, hasStringProp } from "../utils/has-type-prop.js";
import { isStringArray } from "../utils/is-type-array.js";

export function isTopicProgress(obj: unknown): obj is TopicProgress {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "id") &&
    hasStringProp(obj, "userId") &&
    hasStringProp(obj, "topicId") &&
    hasStringProp(obj, "topicTitle") &&
    "completedWidgetIds" in obj &&
    isStringArray(obj.completedWidgetIds) &&
    hasNumberProp(obj, "percent") &&
    hasStringProp(obj, "updatedAt")
  );
}

export function isTopicProgressArray(obj: unknown): obj is TopicProgress[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isTopicProgress(item))
  );
}
