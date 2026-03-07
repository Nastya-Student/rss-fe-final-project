import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { TrueFalseAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import { TrueFalseWidget } from "../../types/widget.type.js";
import trueFalseWidget from "./true-false.widget.js";

export const trueFalseStrategy: WidgetStrategy<
  TrueFalseWidget,
  TrueFalseAnswer
> = {
  type: "true-false",

  render(widget, onAnswer) {
    return trueFalseWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    return answer.answer === widget.payload.correct;
  },
};
