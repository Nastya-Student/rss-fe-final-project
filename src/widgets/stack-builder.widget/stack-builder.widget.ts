import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { StackBuilderPayload } from "../../interfaces/widget-payload.interfaces.js";
import { StackBuilderAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./stack-builder.widget.css";

export default function stackBuilderWidget(
  payload: StackBuilderPayload,
  onAnswer: (answer: StackBuilderAnswer) => void,
): HTMLElement {
  const stackBuilderWidgetContainer = new ElementCreator({
    classes: ["stack-builder-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: stackBuilderWidgetContainer,
    text: "Stack Builder Widget",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: stackBuilderWidgetContainer,
    text: payload.title,
  }).getElement();
  if (payload.steps[0]) {
    new ParagraphCreator({
      parent: stackBuilderWidgetContainer,
      text: payload.steps[0]?.line.toString(),
    }).getElement();

    new ParagraphCreator({
      parent: stackBuilderWidgetContainer,
      text: payload.steps[0]?.code,
    }).getElement();
  }

  const submitButton = new ButtonCreator({
    text: "Submit",
    classes: [CLASS_NAME.button],
    parent: stackBuilderWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: StackBuilderAnswer = {
    answer: [{ line: 1, stack: ["main", "factorial(3)"] }],
  };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
  });

  return stackBuilderWidgetContainer;
}
