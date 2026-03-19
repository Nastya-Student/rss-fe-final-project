import { CLASS_NAME } from "../../../constants.js";
import { CLASS_NAMES_PRACTICE } from "../../../pages/practice.page/practice.page.js";
import { RoutePath } from "../../../types/route-path.enum.js";
import ButtonCreator from "../../../utils/button/button-creator.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import "./results-screen.component.css";

export default function resultsScreenComponent(): HTMLElement {
  const resultsScreenContainer = new ElementCreator({
    classes: [CLASS_NAMES_PRACTICE.resultsScreenContainer],
  }).getElement();

  new ParagraphCreator({
    parent: resultsScreenContainer,
    text: "Results Screen",
  }).getElement();

  const libraryButton = new ButtonCreator({
    parent: resultsScreenContainer,
    text: "Go back to Library",
    classes: [CLASS_NAME.button],
  }).getElement();
  libraryButton.dataset.route = RoutePath.Library;

  return resultsScreenContainer;
}
