import { WidgetType } from "../types/widget-type.type.js";
import { Widget } from "../types/widget.type.js";
import { hasNumberProp, hasStringProp } from "../utils/has-type-prop.js";
import { isStringArray } from "../utils/is-type-array.js";
import {
  isAsyncSorterPayload,
  isCodeCompletionPayload,
  isCodeOrderingPayload,
  isMemoryGamePayload,
  isQuizPayload,
  isStackBuilderPayload,
  isTrueFalsePayload,
} from "./widget-payload.guards.js";

export function isBaseWidget(obj: unknown): obj is Widget {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "id") &&
    hasStringProp(obj, "topicId") &&
    "type" in obj &&
    isWidgetType(obj.type) &&
    hasNumberProp(obj, "version") &&
    hasNumberProp(obj, "difficulty") &&
    "tags" in obj &&
    isStringArray(obj.tags)
  );
}

export function isWidget(obj: unknown): obj is Widget {
  if (!isBaseWidget(obj)) return false;

  switch (obj.type) {
    case "quiz": {
      return isQuizPayload(obj.payload);
    }
    case "true-false": {
      return isTrueFalsePayload(obj.payload);
    }
    case "code-completion": {
      return isCodeCompletionPayload(obj.payload);
    }
    case "code-ordering": {
      return isCodeOrderingPayload(obj.payload);
    }
    case "memory-game": {
      return isMemoryGamePayload(obj.payload);
    }
    case "stack-builder": {
      return isStackBuilderPayload(obj.payload);
    }
    case "async-sorter": {
      return isAsyncSorterPayload(obj.payload);
    }
    default: {
      return false;
    }
  }
}

export function isWidgetArray(obj: unknown): obj is Widget[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isWidget(item))
  );
}

function isWidgetType(type: unknown): type is WidgetType {
  if (typeof type !== "string") return false;

  switch (type) {
    case "quiz":
    case "true-false":
    case "code-completion":
    case "code-ordering":
    case "memory-game":
    case "stack-builder":
    case "async-sorter": {
      return true;
    }
    default: {
      return false;
    }
  }
}
