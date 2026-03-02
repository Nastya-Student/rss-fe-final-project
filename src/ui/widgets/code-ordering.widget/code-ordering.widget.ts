import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./code-ordering.widget.css";

export default function codeOrderingWidget(): HTMLElement {
  const codeOrderingWidgetContainer = new ElementCreator({
    classes: ["code-ordering-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: codeOrderingWidgetContainer,
    text: "Code Ordering Widget",
  }).getElement();

  return codeOrderingWidgetContainer;
}
