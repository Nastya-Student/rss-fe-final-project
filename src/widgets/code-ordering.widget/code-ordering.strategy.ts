import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { CodeOrderingWidget } from "../../types/widget.type.js";
import codeOrderingWidget from "./code-ordering.widget.js";

export type CodeOrderingAnswer = {
  order: number[];
};

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

    if (answer.order.length !== correctOrder.length) {
      return false;
    }

    return answer.order.every((itemIndex, i) => itemIndex === correctOrder[i]);
  },
};
