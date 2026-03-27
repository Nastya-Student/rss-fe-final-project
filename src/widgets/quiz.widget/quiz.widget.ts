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
    classes: ["quiz__options-container"],
    parent: quizWidgetContainer,
  }).getElement();

  let userAnswer: string | undefined;
  let pressedOption: HTMLElement | undefined;

  optionsContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const option = target.closest<HTMLElement>(".quiz__option");
    if (option && pressedOption && option !== pressedOption) {
      pressedOption.classList.remove("pressed");
      option.classList.add("pressed");
      pressedOption = option;
      userAnswer = option.textContent;
    } else if (option && option === pressedOption) {
      pressedOption.classList.remove("pressed");
      pressedOption = undefined;
      userAnswer = undefined;
    } else if (option) {
      option.classList.add("pressed");
      pressedOption = option;
      userAnswer = option.textContent;
    } else {
      return;
    }
  });

  for (const option of shuffleArray(payload.options)) {
    new ElementCreator({
      parent: optionsContainer,
      text: option,
      classes: ["quiz__option", CLASS_NAME.cardElement],
    });
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
  });

  return quizWidgetContainer;
}
