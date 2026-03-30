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
import InputCreator from "../../utils/input/input-creator.js";
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
    classes: ["code-completion-title"],
  }).getElement();

  new ParagraphCreator({
    parent: codeCompletionWidgetContainer,
    text: "Complete the code snippets by filling in missing parts",
    classes: ["code-completion-descr"],
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: codeCompletionWidgetContainer,
    text: payload.title,
  }).getElement();

  const codeField = new ElementCreator({
    parent: codeCompletionWidgetContainer,
    classes: ["completion-code-container", "card-element"],
  }).getElement();

  const codeText = payload.code;
  const codeTextArray = codeText.split("\n");
  const blankMark = payload.blanks[0] ?? "____";

  for (const item of codeTextArray) {
    let currentIndex = 0;
    let blankIndex = item.indexOf(blankMark, currentIndex);

    if (blankIndex == -1) {
      codeField.append(item);
    } else {
      const complicatedString = new ElementCreator({
        parent: codeField,
        classes: ["complicated-string"],
      }).getElement();

      while (blankIndex !== -1) {
        const textBefore = item.slice(currentIndex, blankIndex);
        if (textBefore) {
          new ElementCreator({
            tag: "span",
            text: textBefore,
            classes: ["code-completion-text"],
            parent: complicatedString,
          }).getElement();
        }

        const innerInput = new InputCreator({
          placeholder: "",
          classes: ["code-completion-input"],
          parent: complicatedString,
        }).getElement();
        innerInput.type = "text";

        currentIndex = blankIndex + blankMark.length;
        blankIndex = item.indexOf(blankMark, currentIndex);
      }

      const textAfter = item.slice(currentIndex);
      if (textAfter) {
        new ElementCreator({
          tag: "span",
          text: textAfter,
          classes: ["code-completion-text"],
          parent: complicatedString,
        }).getElement();
      }
    }
  }

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAME.button],
    parent: codeCompletionWidgetContainer,
  }).getElement();

  submitButton.addEventListener(EVENT.click, () => {
    const inputValues = document.querySelectorAll(".code-completion-input");
    const answersArray: CodeCompletionAnswer = { answer: [] };

    for (const item of inputValues) {
      if (item instanceof HTMLInputElement) {
        answersArray.answer.push(item.value);
      }
    }

    onAnswer(answersArray);
    submitButton.classList.add(CLASS_NAME.noActive);
    submitButton.disabled = true;
  });

  return codeCompletionWidgetContainer;
}
