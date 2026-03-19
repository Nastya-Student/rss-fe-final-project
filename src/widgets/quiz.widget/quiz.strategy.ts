import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { QuizAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import { QuizWidget } from "../../types/widget.type.js";
import quizWidget from "./quiz.widget.js";

export const quizStrategy: WidgetStrategy<QuizWidget, QuizAnswer> = {
  type: "quiz",

  render(widget, onAnswer) {
    return quizWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    return answer.answer === widget.payload.correctIndex;
  },
};
