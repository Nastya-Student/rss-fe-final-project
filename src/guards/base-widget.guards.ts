import { BaseWidget } from "../interfaces/base-widget.interface.js";
import { Widget } from "../types/widget.type.js";
import { hasStringProp } from "../utils/has-type-prop.js";

export function isBaseWidget(obj: unknown): obj is BaseWidget {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "id") &&
    hasStringProp(obj, "topicId") &&
    "type" in obj &&
    isWidgetType(obj.type) &&
    hasStringProp(obj, "title")
  );
}

export function isBaseWidgetArray(obj: unknown): obj is BaseWidget[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isBaseWidget(item))
  );
}

function isWidgetType(type: unknown): type is Widget {
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
