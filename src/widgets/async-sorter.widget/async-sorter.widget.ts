import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { AsyncSorterPayload } from "../../interfaces/widget-payload.interfaces.js";
import { AsyncSorterAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../../pages/practice.page/practice.page.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./async-sorter.widget.css";

export default function asyncSorterWidget(
  payload: AsyncSorterPayload,
  onAnswer: (answer: AsyncSorterAnswer) => void,
): HTMLElement {
  const asyncSorterWidgetContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_PRACTICE.asyncSorterWidgetContainer,
      CLASS_NAME.cardElement,
    ],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: asyncSorterWidgetContainer,
    text: "Async Sorter Widget",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: asyncSorterWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: asyncSorterWidgetContainer,
    text: payload.code,
  }).getElement();

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAME.button],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: AsyncSorterAnswer = {
    answer: [
      { name: "callstack", items: ["1", "4"] },
      { name: "microtasks", items: ["3"] },
      { name: "macrotasks", items: ["2"] },
      { name: "output", items: ["1", "4", "3", "2"] },
    ],
  };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
    submitButton.classList.add(CLASS_NAME.noActive);
    submitButton.disabled = true;
  });

  return asyncSorterWidgetContainer;
}
