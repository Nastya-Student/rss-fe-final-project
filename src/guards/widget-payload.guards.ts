import {
  AsyncSorterBucket,
  AsyncSorterPayload,
  CodeCompletionPayload,
  CodeOrderingPayload,
  MemoryGameLink,
  MemoryGameObject,
  MemoryGamePayload,
  QuizPayload,
  StackBuilderPayload,
  StackBuilderStep,
  TrueFalsePayload,
} from "../interfaces/widget-payload.interfaces.js";
import {
  hasBooleanProp,
  hasNumberProp,
  hasStringProp,
} from "../utils/has-type-prop.js";
import { isNumberArray, isStringArray } from "../utils/is-type-array.js";

export function isQuizPayload(obj: unknown): obj is QuizPayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "title") &&
    hasStringProp(obj, "question") &&
    "options" in obj &&
    isStringArray(obj.options) &&
    hasStringProp(obj, "correctAnswer")
  );
}

export function isTrueFalsePayload(obj: unknown): obj is TrueFalsePayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "title") &&
    hasStringProp(obj, "statement") &&
    hasBooleanProp(obj, "correct") &&
    (obj.explanation === undefined || hasStringProp(obj, "explanation"))
  );
}

export function isCodeCompletionPayload(
  obj: unknown,
): obj is CodeCompletionPayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "title") &&
    hasStringProp(obj, "code") &&
    "blanks" in obj &&
    isStringArray(obj.blanks) &&
    "correctAnswers" in obj &&
    isStringArray(obj.correctAnswers)
  );
}

export function isCodeOrderingPayload(
  obj: unknown,
): obj is CodeOrderingPayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "title") &&
    hasStringProp(obj, "description") &&
    "lines" in obj &&
    isStringArray(obj.lines) &&
    "correctOrder" in obj &&
    isNumberArray(obj.correctOrder)
  );
}

function isMemoryGameObject(obj: unknown): obj is MemoryGameObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasNumberProp(obj, "id") &&
    hasStringProp(obj, "label")
  );
}

function isMemoryGameLink(obj: unknown): obj is MemoryGameLink {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasNumberProp(obj, "from") &&
    hasNumberProp(obj, "to")
  );
}

function isMemoryGameObjectArray(obj: unknown): obj is MemoryGameObject[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isMemoryGameObject(item))
  );
}

function isMemoryGameLinkArray(obj: unknown): obj is MemoryGameLink[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isMemoryGameLink(item))
  );
}

export function isMemoryGamePayload(obj: unknown): obj is MemoryGamePayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "title") &&
    hasStringProp(obj, "codeSnippet") &&
    "objects" in obj &&
    isMemoryGameObjectArray(obj.objects) &&
    "links" in obj &&
    isMemoryGameLinkArray(obj.links) &&
    "garbageIds" in obj &&
    isNumberArray(obj.garbageIds)
  );
}

function isStackBuilderStep(obj: unknown): obj is StackBuilderStep {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasNumberProp(obj, "line") &&
    hasStringProp(obj, "code") &&
    "correctStack" in obj &&
    isStringArray(obj.correctStack)
  );
}

function isStackBuilderStepArray(obj: unknown): obj is StackBuilderStep[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isStackBuilderStep(item))
  );
}

export function isStackBuilderPayload(
  obj: unknown,
): obj is StackBuilderPayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "title") &&
    "steps" in obj &&
    isStackBuilderStepArray(obj.steps)
  );
}

function isAsyncSorterBucket(obj: unknown): obj is AsyncSorterBucket {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "name") &&
    "correctItems" in obj &&
    isStringArray(obj.correctItems)
  );
}

function isSAsyncSorterBucketArray(obj: unknown): obj is AsyncSorterBucket[] {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj) &&
    obj.every((item) => isAsyncSorterBucket(item))
  );
}

export function isAsyncSorterPayload(obj: unknown): obj is AsyncSorterPayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    hasStringProp(obj, "title") &&
    hasStringProp(obj, "code") &&
    "buckets" in obj &&
    isSAsyncSorterBucketArray(obj.buckets)
  );
}
