import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { TrueFalsePayload } from "../../interfaces/widget-payload.interfaces.js";
import { TrueFalseAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./true-false.widget.css";

export default function trueFalseWidget(
  payload: TrueFalsePayload,
  onAnswer: (answer: TrueFalseAnswer) => void,
): HTMLElement {
  const trueFalseWidgetContainer = new ElementCreator({
    classes: ["true-false-widget-container", CLASS_NAME.cardElement],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: trueFalseWidgetContainer,
    text: "True-False Widget",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: trueFalseWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: trueFalseWidgetContainer,
    text: payload.statement,
  }).getElement();

  const submitButton = new ButtonCreator({
    text: "Submit",
    classes: [CLASS_NAME.button],
    parent: trueFalseWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: TrueFalseAnswer = { answer: false };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
  });

  return trueFalseWidgetContainer;
}
