import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { QuizPayload } from "../../interfaces/widget-payload.interfaces.js";
import { QuizAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./quiz.widget.css";

export default function quizWidget(
  payload: QuizPayload,
  onAnswer: (answer: QuizAnswer) => void,
): HTMLElement {
  const quizWidgetContainer = new ElementCreator({
    classes: ["quiz-widget-container", CLASS_NAME.cardElement],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: quizWidgetContainer,
    text: "Quiz Widget",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: quizWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: quizWidgetContainer,
    text: payload.question,
  }).getElement();

  const submitButton = new ButtonCreator({
    text: "Submit",
    classes: [CLASS_NAME.button],
    parent: quizWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: QuizAnswer = { answer: 1 };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
  });

  return quizWidgetContainer;
}
