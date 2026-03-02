import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./garbage-collector.widget.css";

export default function garbageCollectorWidget(): HTMLElement {
  const garbageCollectorWidgetContainer = new ElementCreator({
    classes: ["garbage-collector-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: garbageCollectorWidgetContainer,
    text: "Garbage Collector Widget",
  }).getElement();

  return garbageCollectorWidgetContainer;
}
