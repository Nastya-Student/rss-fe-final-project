import { BaseWidget } from "../interfaces/base-widget.interface.js";
import {
  AsyncSorterPayload,
  CodeCompletionPayload,
  CodeOrderingPayload,
  MemoryGamePayload,
  QuizPayload,
  StackBuilderPayload,
  TrueFalsePayload,
} from "../interfaces/widget-payload.interfaces.js";

export type Widget =
  | QuizWidget
  | TrueFalseWidget
  | CodeCompletionWidget
  | CodeOrderingWidget
  | MemoryGameWidget
  | AsyncSorterWidget
  | StackBuilderWidget;

export type QuizWidget = BaseWidget<QuizPayload, "quiz">;

export type TrueFalseWidget = BaseWidget<TrueFalsePayload, "true-false">;

export type CodeCompletionWidget = BaseWidget<
  CodeCompletionPayload,
  "code-completion"
>;

export type CodeOrderingWidget = BaseWidget<
  CodeOrderingPayload,
  "code-ordering"
>;

export type MemoryGameWidget = BaseWidget<MemoryGamePayload, "memory-game">;

export type StackBuilderWidget = BaseWidget<
  StackBuilderPayload,
  "stack-builder"
>;

export type AsyncSorterWidget = BaseWidget<AsyncSorterPayload, "async-sorter">;
