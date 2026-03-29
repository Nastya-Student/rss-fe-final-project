import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { QuizPayload } from "../../interfaces/widget-payload.interfaces.js";
import { QuizAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../../pages/practice.page/practice.page.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import shuffleArray from "../../utils/shuffle-array.js";
import "./quiz.widget.css";

export const CLASS_NAMES_QUIZ_WIDGET = {
  quizTitle: "quiz__quiz-title",
  widgetDescription: "quiz__widget-description",
  optionsContainer: "quiz__options-container",
  option: "quiz__option",
  pressed: "pressed",
};

export const STRING_CONSTANTS_QUIZ_WIDGET = {
  quiz: "Quiz",
  widgetDescription:
    "Test your knowledge with interactive multiple-choice quizzes",
};

export default function quizWidget(
  payload: QuizPayload,
  onAnswer: (answer: QuizAnswer) => void,
): HTMLElement {
  const quizWidgetContainer = new ElementCreator({
    classes: [CLASS_NAMES_PRACTICE.quizWidgetContainer, CLASS_NAME.cardElement],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: quizWidgetContainer,
    classes: [CLASS_NAMES_QUIZ_WIDGET.quizTitle],
    text: STRING_CONSTANTS_QUIZ_WIDGET.quiz,
  }).getElement();

  new ParagraphCreator({
    parent: quizWidgetContainer,
    classes: [CLASS_NAMES_QUIZ_WIDGET.widgetDescription],
    text: STRING_CONSTANTS_QUIZ_WIDGET.widgetDescription,
  });

  new HeadingsCreator(HEADINGS_THREE, {
    parent: quizWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: quizWidgetContainer,
    text: payload.question,
  }).getElement();

  const optionsContainer = new ElementCreator({
    classes: [CLASS_NAMES_QUIZ_WIDGET.optionsContainer],
    parent: quizWidgetContainer,
  }).getElement();

  let userAnswer: string | undefined;
  let pressedOption: HTMLElement | undefined;

  optionsContainer.addEventListener(EVENT.click, (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const option = target.closest<HTMLElement>(
      `.${CLASS_NAMES_QUIZ_WIDGET.option}`,
    );

    if (!option) {
      return;
    }

    if (option === pressedOption) {
      option.classList.remove(CLASS_NAMES_QUIZ_WIDGET.pressed);
      pressedOption = undefined;
      userAnswer = undefined;
      return;
    }

    pressedOption?.classList.remove(CLASS_NAMES_QUIZ_WIDGET.pressed);

    option.classList.add(CLASS_NAMES_QUIZ_WIDGET.pressed);
    pressedOption = option;
    userAnswer = option.textContent;
  });

  const optionsElements: HTMLElement[] = [];

  for (const option of shuffleArray(payload.options)) {
    const optionElement = new ElementCreator({
      parent: optionsContainer,
      text: option,
      classes: [CLASS_NAMES_QUIZ_WIDGET.option, CLASS_NAME.cardElement],
    }).getElement();
    optionsElements.push(optionElement);
  }

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAMES_PRACTICE.submitButton, CLASS_NAME.button],
    parent: quizWidgetContainer,
  }).getElement();

  submitButton.addEventListener(EVENT.click, () => {
    const selectedAnswerIndex: QuizAnswer = { answer: "" };
    if (userAnswer !== undefined) {
      selectedAnswerIndex.answer = userAnswer;
    }
    onAnswer(selectedAnswerIndex);
    submitButton.classList.add(CLASS_NAME.noActive);
    submitButton.disabled = true;
    for (const optionElement of optionsElements) {
      optionElement.classList.add(CLASS_NAME.noActive);
    }
  });

  return quizWidgetContainer;
}
