import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { TrueFalsePayload } from "../../interfaces/widget-payload.interfaces.js";
import { TrueFalseAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../../pages/practice.page/practice.page.js";
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
    classes: [
      CLASS_NAMES_PRACTICE.trueFalseWidgetContainer,
      CLASS_NAME.cardElement,
    ],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: trueFalseWidgetContainer,
    text: "True-False Widget",
  }).getElement();

  new ParagraphCreator({
    parent: trueFalseWidgetContainer,
    text: "Decide if this statement is true or false",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: trueFalseWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: trueFalseWidgetContainer,
    text: payload.statement,
  }).getElement();

  const answersWrapper = new ElementCreator({
    classes: ["truefalse-wrapper"],
    parent: trueFalseWidgetContainer,
  }).getElement();

  const trueButton = new ButtonCreator({
    text: "True",
    classes: [CLASS_NAME.button, "truefalse-btn"],
    parent: answersWrapper,
  }).getElement();

  const falseButton = new ButtonCreator({
    text: "False",
    classes: [CLASS_NAME.button, "truefalse-btn"],
    parent: answersWrapper,
  }).getElement();

  let selectedAnswerIndex: TrueFalseAnswer;

  function setAnswer(value: boolean, button: HTMLButtonElement): void {
    selectedAnswerIndex = { answer: value };
    trueButton.classList.remove("truefalse-chosen");
    falseButton.classList.remove("truefalse-chosen");
    button.classList.add("truefalse-chosen");
  }

  trueButton.addEventListener("click", (evt) => {
    setAnswer(true, evt.currentTarget as HTMLButtonElement);
  });
  falseButton.addEventListener("click", (evt) => {
    setAnswer(false, evt.currentTarget as HTMLButtonElement);
  });

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAME.button],
    parent: trueFalseWidgetContainer,
  }).getElement();

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
    submitButton.classList.add(CLASS_NAME.noActive);
    submitButton.disabled = true;
    trueButton.disabled = true;
    falseButton.disabled = true;
  });

  return trueFalseWidgetContainer;
}
