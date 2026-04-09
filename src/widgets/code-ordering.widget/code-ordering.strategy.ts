import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { CodeOrderingWidget } from "../../types/widget.type.js";
import codeOrderingWidget from "./code-ordering.widget.js";
import { CodeOrderingAnswer } from "../../interfaces/widget-user-answer.interfaces.js";

export const codeOrderingStrategy: WidgetStrategy<
  CodeOrderingWidget,
  CodeOrderingAnswer
> = {
  type: "code-ordering",

  render(widget, onAnswer) {
    return codeOrderingWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    const correctOrder = widget.payload.correctOrder;

    if (answer.answer.length !== correctOrder.length) {
      return false;
    }

    return answer.answer.every((itemIndex, i) => itemIndex === correctOrder[i]);
  },
};
