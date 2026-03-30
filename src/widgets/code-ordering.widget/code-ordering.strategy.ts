import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { CodeOrderingAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import { CodeOrderingWidget } from "../../types/widget.type.js";
import codeOrderingWidget from "./code-ordering.widget.js";

export const codeOrderingStrategy: WidgetStrategy<
  CodeOrderingWidget,
  CodeOrderingAnswer
> = {
  type: "code-ordering",

  render(widget, onAnswer) {
    return codeOrderingWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    return answer.answer === widget.payload.correctOrder;
  },
};
