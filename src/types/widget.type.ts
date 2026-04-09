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
import {
  AsyncSorterAnswer,
  CodeCompletionAnswer,
  CodeOrderingAnswer,
  MemoryGameAnswer,
  QuizAnswer,
  StackBuilderAnswer,
  TrueFalseAnswer,
} from "../interfaces/widget-user-answer.interfaces.js";

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

export type WidgetMap = {
  quiz: QuizWidget;
  "true-false": TrueFalseWidget;
  "code-completion": CodeCompletionWidget;
  "code-ordering": CodeOrderingWidget;
  "memory-game": MemoryGameWidget;
  "stack-builder": StackBuilderWidget;
  "async-sorter": AsyncSorterWidget;
};

export type WidgetAnswerMap = {
  quiz: QuizAnswer;
  "true-false": TrueFalseAnswer;
  "code-completion": CodeCompletionAnswer;
  "code-ordering": CodeOrderingAnswer;
  "memory-game": MemoryGameAnswer;
  "stack-builder": StackBuilderAnswer;
  "async-sorter": AsyncSorterAnswer;
};
