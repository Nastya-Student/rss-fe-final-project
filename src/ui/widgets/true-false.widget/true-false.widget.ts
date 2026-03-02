import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./true-false.widget.css";

export default function trueFalseWidget(): HTMLElement {
  const trueFalseWidgetContainer = new ElementCreator({
    classes: ["true-false-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: trueFalseWidgetContainer,
    text: "True-False Widget",
  }).getElement();

  return trueFalseWidgetContainer;
}
