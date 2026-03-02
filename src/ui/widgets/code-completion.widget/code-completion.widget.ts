import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./code-completion.widget.css";

export default function codeCompletionWidget(): HTMLElement {
  const codeCompletionWidgetContainer = new ElementCreator({
    classes: ["code-completion-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: codeCompletionWidgetContainer,
    text: "Code Completion Widget",
  }).getElement();

  return codeCompletionWidgetContainer;
}
