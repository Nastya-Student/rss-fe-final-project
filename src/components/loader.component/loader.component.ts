import ElementCreator from "../../utils/element-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./loader.component.css";

export default function loaderComponent(): HTMLElement {
  const loaderOverlay = new ElementCreator({
    classes: ["loader-overlay"],
  }).getElement();

  const loaderContainer = new ElementCreator({
    classes: ["loader-container"],
    parent: loaderOverlay,
  }).getElement();

  new ParagraphCreator({
    classes: ["loader-container__text"],
    parent: loaderContainer,
    text: "Loading...",
  }).getElement();

  new ElementCreator({
    parent: loaderContainer,
    classes: ["loader-container__spinner"],
  }).getElement();

  return loaderOverlay;
}
