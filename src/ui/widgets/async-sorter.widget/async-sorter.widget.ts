import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./async-sorter.widget.css";

export default function asyncSorterWidget(): HTMLElement {
  const asyncSorterWidgetContainer = new ElementCreator({
    classes: ["async-sorter-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: asyncSorterWidgetContainer,
    text: "Async Sorter Widget",
  }).getElement();

  return asyncSorterWidgetContainer;
}
