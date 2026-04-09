import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { StackBuilderAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import { StackBuilderWidget } from "../../types/widget.type.js";
import stackBuilderWidget from "./stack-builder.widget.js";

export const stackBuilderStrategy: WidgetStrategy<
  StackBuilderWidget,
  StackBuilderAnswer
> = {
  type: "stack-builder",

  render(widget, onAnswer) {
    return stackBuilderWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    if (!widget.payload.steps[0]) {
      return false;
    }
    const correct = widget.payload.steps[0].correctStack;

    return JSON.stringify(answer.answer) === JSON.stringify(correct);
  },
};
