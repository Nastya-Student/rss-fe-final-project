import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import sessionComponent from "../session.component/session.component.js";
import "./session-history.component.css";

export default function sessionHistoryComponent(
  sessionArr: PracticeSession[],
): HTMLElement {
  const sessionHistoryContainer = new ElementCreator({
    classes: ["dashboard__session-history-container"],
  }).getElement();

  const sessionHistoryTitle = new ParagraphCreator({
    classes: ["dashboard__session-history-paragraph"],
    parent: sessionHistoryContainer,
  }).getElement();
  sessionHistoryTitle.textContent = "Session history";

  const sessionsContainer = new ElementCreator({
    classes: ["dashboard__sessions-container"],
    parent: sessionHistoryContainer,
  }).getElement();

  for (const session of sessionArr) {
    sessionsContainer.append(sessionComponent(session));
  }

  return sessionHistoryContainer;
}
