import { CLASS_NAME } from "../../../constants.js";
import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import {
  CLASS_NAMES_DASHBOARD,
  STRING_CONSTANTS_DASHBOARD,
} from "../../../pages/dashboard.page/dashboard.page.js";
import { RoutePath } from "../../../types/route-path.enum.js";
import ButtonCreator from "../../../utils/button/button-creator.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import "./session.component.css";

export default function sessionComponent(
  session: PracticeSession,
): HTMLElement {
  const sessionContainer = new ElementCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionContainer],
  }).getElement();

  const sessionTopicTitle = new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicTitle],
    parent: sessionContainer,
  }).getElement();
  sessionTopicTitle.textContent = session.topicTitle;

  const sessionTopicScore = new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicScore],
    parent: sessionContainer,
  }).getElement();
  sessionTopicScore.textContent = `${session.score.toString()}${STRING_CONSTANTS_DASHBOARD.outOfHundred}`;

  const sessionTopicDate = new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicDate],
    parent: sessionContainer,
  }).getElement();
  const completedAt = new Date(session.completedAt);
  sessionTopicDate.textContent = completedAt.toLocaleDateString(
    STRING_CONSTANTS_DASHBOARD.sessionTopicDateLocale,
  );

  const sessionTopicButton = new ButtonCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicButton, CLASS_NAME.button],
    parent: sessionContainer,
  }).getElement();
  sessionTopicButton.textContent = STRING_CONSTANTS_DASHBOARD.arrowRight;
  sessionTopicButton.dataset.route = `${RoutePath.Practice}/${session.topicId}`;

  return sessionContainer;
}
