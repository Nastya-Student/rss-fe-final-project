import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { CodeCompletionPayload } from "../../interfaces/widget-payload.interfaces.js";
import { CodeCompletionAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../../pages/practice.page/practice.page.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./code-completion.widget.css";

export default function codeCompletionWidget(
  payload: CodeCompletionPayload,
  onAnswer: (answer: CodeCompletionAnswer) => void,
): HTMLElement {
  const codeCompletionWidgetContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_PRACTICE.codeCompletionWidgetContainer,
      CLASS_NAME.cardElement,
    ],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: codeCompletionWidgetContainer,
    text: "Code Completion Widget",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: codeCompletionWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: codeCompletionWidgetContainer,
    text: payload.code,
  }).getElement();

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAME.button],
    parent: codeCompletionWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: CodeCompletionAnswer = { answer: ["map"] };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
  });

  return codeCompletionWidgetContainer;
}
