import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { MemoryGamePayload } from "../../interfaces/widget-payload.interfaces.js";
import { MemoryGameAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../../pages/practice.page/practice.page.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import PreCreator from "../../utils/pre/pre-creator.js";
import { SVGSVGCreator } from "../../utils/svg-elements/svg-svg/svg-svg.js";
import { GraphRenderer } from "./graph-renderer.js";
import "./memory-game.widget.css";

export const CLASS_NAMES_MEMORY_GAME_WIDGET = {
  memoryGameTitle: "memory-game__memory-game-title",
  widgetDescription: "memory-game__widget-description",
  codeContainer: "memory-game__code-container",
};

export const STRING_CONSTANTS_MEMORY_GAME_WIDGET = {
  memoryGame: "Memory Game",
  widgetDescription:
    "Click on objects that become garbage after code execution",
};

export default function memoryGameWidget(
  payload: MemoryGamePayload,
  onAnswer: (answer: MemoryGameAnswer) => void,
): HTMLElement {
  const memoryGameWidgetContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_PRACTICE.memoryGameWidgetContainer,
      CLASS_NAME.cardElement,
    ],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: memoryGameWidgetContainer,
    classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.memoryGameTitle],
    text: STRING_CONSTANTS_MEMORY_GAME_WIDGET.memoryGame,
  }).getElement();

  new ParagraphCreator({
    parent: memoryGameWidgetContainer,
    classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.widgetDescription],
    text: STRING_CONSTANTS_MEMORY_GAME_WIDGET.widgetDescription,
  });

  new HeadingsCreator(HEADINGS_THREE, {
    parent: memoryGameWidgetContainer,
    text: payload.title,
  }).getElement();

  new PreCreator({
    classes: [
      CLASS_NAMES_MEMORY_GAME_WIDGET.codeContainer,
      CLASS_NAME.cardElement,
    ],
    parent: memoryGameWidgetContainer,
    text: payload.codeSnippet,
  }).getElement();

  const svgElement = new SVGSVGCreator({
    classes: ["memory-game__svg", CLASS_NAME.cardElement],
    attributes: {
      viewBox: "0 0 500 300",
      preserveAspectRatio: "xMidYMid meet",
    },
  }).getElement();

  const graphRenderer = new GraphRenderer(svgElement);

  graphRenderer.render(payload);
  memoryGameWidgetContainer.append(svgElement);

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAME.button],
    parent: memoryGameWidgetContainer,
  }).getElement();

  const selectedAnswerIndex: MemoryGameAnswer = {
    answer: [{ from: 2, to: 1 }],
  };

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(selectedAnswerIndex);
    submitButton.classList.add(CLASS_NAME.noActive);
    submitButton.disabled = true;
  });

  return memoryGameWidgetContainer;
}
