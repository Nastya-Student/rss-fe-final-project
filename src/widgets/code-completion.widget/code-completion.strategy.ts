import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { CodeCompletionAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import { CodeCompletionWidget } from "../../types/widget.type.js";
import codeCompletionWidget from "./code-completion.widget.js";

export const codeCompletionStrategy: WidgetStrategy<
  CodeCompletionWidget,
  CodeCompletionAnswer
> = {
  type: "code-completion",

  render(widget, onAnswer) {
    return codeCompletionWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    return answer.answer.join(",") === widget.payload.correctAnswers.join(",");
  },
};
