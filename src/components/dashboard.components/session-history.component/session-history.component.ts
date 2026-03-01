import {
  CLASS_NAMES_DASHBOARD,
  STRING_CONSTANTS_DASHBOARD,
} from "../../../pages/dashboard.page/dashboard.page.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import "./session-history.component.css";

export default function sessionHistoryComponent(): {
  sessionHistoryContainer: HTMLElement;
  sessionsContainer: HTMLElement;
} {
  const sessionHistoryContainer = new ElementCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionHistoryContainer],
  }).getElement();

  const sessionHistoryTitle = new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionHistoryParagraph],
    parent: sessionHistoryContainer,
  }).getElement();
  sessionHistoryTitle.textContent = STRING_CONSTANTS_DASHBOARD.sessionHistory;

  const sessionsContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_DASHBOARD.sessionsContainer,
      CLASS_NAMES_DASHBOARD.cardElement,
    ],
    parent: sessionHistoryContainer,
  }).getElement();

  return { sessionHistoryContainer, sessionsContainer };
}
