import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import "./session-history.component.css";

export default function sessionHistoryComponent(): {
  sessionHistoryContainer: HTMLElement;
  sessionsContainer: HTMLElement;
} {
  const sessionHistoryContainer = new ElementCreator({
    classes: ["dashboard__session-history-container"],
  }).getElement();

  const sessionHistoryTitle = new ParagraphCreator({
    classes: ["dashboard__session-history-paragraph"],
    parent: sessionHistoryContainer,
  }).getElement();
  sessionHistoryTitle.textContent = "Session history";

  const sessionsContainer = new ElementCreator({
    classes: ["dashboard__sessions-container", "dashboard__card-element"],
    parent: sessionHistoryContainer,
  }).getElement();

  return { sessionHistoryContainer, sessionsContainer };
}
