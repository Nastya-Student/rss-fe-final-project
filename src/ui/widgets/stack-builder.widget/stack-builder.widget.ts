import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./stack-builder.widget.css";

export default function stackBuilderWidget(): HTMLElement {
  const stackBuilderWidgetContainer = new ElementCreator({
    classes: ["stack-builder-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: stackBuilderWidgetContainer,
    text: "Stack Builder Widget",
  }).getElement();

  return stackBuilderWidgetContainer;
}
