import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./memory-game.widget.css";

export default function memoryGameWidget(): HTMLElement {
  const memoryGameCollectorWidgetContainer = new ElementCreator({
    classes: ["memory-game-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: memoryGameCollectorWidgetContainer,
    text: "Memory Game Widget",
  }).getElement();

  return memoryGameCollectorWidgetContainer;
}
