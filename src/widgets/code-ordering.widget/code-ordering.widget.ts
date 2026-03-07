import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { CodeOrderingPayload } from "../../interfaces/widget-payload.interfaces.js";
import { CodeOrderingAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../../pages/practice.page/practice.page.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./code-ordering.widget.css";

export default function codeOrderingWidget(
  payload: CodeOrderingPayload,
  onAnswer: (answer: CodeOrderingAnswer) => void,
): HTMLElement {
  const codeOrderingWidgetContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_PRACTICE.codeOrderingWidgetContainer,
      CLASS_NAME.cardElement,
    ],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: codeOrderingWidgetContainer,
    text: "Code Ordering Widget",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: codeOrderingWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: codeOrderingWidgetContainer,
    text: payload.description,
  }).getElement();

  new ParagraphCreator({
    parent: codeOrderingWidgetContainer,
    text: payload.lines.join(""),
  }).getElement();

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAME.button],
    parent: codeOrderingWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: CodeOrderingAnswer = {
    answer: [0, 1, 2, 3, 4, 5, 6],
  };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
    submitButton.classList.add(CLASS_NAME.noActive);
    submitButton.disabled = true;
  });

  return codeOrderingWidgetContainer;
}
