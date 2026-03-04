import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../../constants.js";
import { MemoryGamePayload } from "../../../interfaces/widget-payload.interfaces.js";
import { MemoryGameAnswer } from "../../../interfaces/widget-user-answer.interfaces.js";
import ButtonCreator from "../../../utils/button/button-creator.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import "./memory-game.widget.css";

export default function memoryGameWidget(
  payload: MemoryGamePayload,
  onAnswer: (answer: MemoryGameAnswer) => void,
): HTMLElement {
  const memoryGameCollectorWidgetContainer = new ElementCreator({
    classes: ["memory-game-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: memoryGameCollectorWidgetContainer,
    text: "Memory Game Widget",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: memoryGameCollectorWidgetContainer,
    text: payload.title,
  }).getElement();

  new ParagraphCreator({
    parent: memoryGameCollectorWidgetContainer,
    text: payload.codeSnippet,
  }).getElement();

  const submitButton = new ButtonCreator({
    text: "Submit",
    classes: [CLASS_NAME.button],
    parent: memoryGameCollectorWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: MemoryGameAnswer = {
    answer: [{ from: 2, to: 1 }],
  };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
  });

  return memoryGameCollectorWidgetContainer;
}
