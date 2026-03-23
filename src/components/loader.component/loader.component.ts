import ElementCreator from "../../utils/element-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./loader.component.css";

export const CLASS_NAMES_LOADER_COMPONENT = {
  loaderOverlay: "loader-overlay",
  loaderContainer: "loader-container",
  text: "loader-container__text",
  spinner: "loader-container__spinner",
} as const;

export const STRING_CONSTANTS_LOADER_COMPONENT = {
  loadingText: "Loading...",
} as const;

export default function loaderComponent(): HTMLElement {
  const loaderOverlay = new ElementCreator({
    classes: [CLASS_NAMES_LOADER_COMPONENT.loaderOverlay],
  }).getElement();

  const loaderContainer = new ElementCreator({
    classes: [CLASS_NAMES_LOADER_COMPONENT.loaderContainer],
    parent: loaderOverlay,
  }).getElement();

  new ParagraphCreator({
    classes: [CLASS_NAMES_LOADER_COMPONENT.text],
    parent: loaderContainer,
    text: STRING_CONSTANTS_LOADER_COMPONENT.loadingText,
  }).getElement();

  new ElementCreator({
    parent: loaderContainer,
    classes: [CLASS_NAMES_LOADER_COMPONENT.spinner],
  }).getElement();

  return loaderOverlay;
}
