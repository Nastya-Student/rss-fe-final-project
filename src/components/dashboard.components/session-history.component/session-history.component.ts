import { HEADINGS_THREE } from "../../../constants.js";
import {
  CLASS_NAMES_DASHBOARD,
  STRING_CONSTANTS_DASHBOARD,
} from "../../../pages/dashboard.page/dashboard.page.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./session-history.component.css";

export default function sessionHistoryComponent(): {
  sessionHistoryContainer: HTMLElement;
  sessionsContainer: HTMLElement;
} {
  const sessionHistoryContainer = new ElementCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionHistoryContainer],
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    classes: [CLASS_NAMES_DASHBOARD.sessionHistoryTitle],
    parent: sessionHistoryContainer,
    text: STRING_CONSTANTS_DASHBOARD.sessionHistory,
  }).getElement();

  const sessionsContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_DASHBOARD.sessionsContainer,
      CLASS_NAMES_DASHBOARD.cardElement,
    ],
    parent: sessionHistoryContainer,
  }).getElement();

  return { sessionHistoryContainer, sessionsContainer };
}
