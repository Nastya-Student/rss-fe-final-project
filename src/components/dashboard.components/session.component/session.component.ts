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

  new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicTitle],
    parent: sessionContainer,
    text: session.topicTitle,
  }).getElement();

  new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicScore],
    parent: sessionContainer,
    text: `${session.score.toString()}${STRING_CONSTANTS_DASHBOARD.outOfHundred}`,
  }).getElement();

  const completedAt = new Date(session.completedAt);
  new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicDate],
    parent: sessionContainer,
    text: completedAt.toLocaleDateString(
      STRING_CONSTANTS_DASHBOARD.sessionTopicDateLocale,
    ),
  }).getElement();

  const sessionTopicButton = new ButtonCreator({
    classes: [CLASS_NAMES_DASHBOARD.sessionTopicButton, CLASS_NAME.button],
    parent: sessionContainer,
    text: STRING_CONSTANTS_DASHBOARD.arrowRight,
  }).getElement();
  sessionTopicButton.dataset.route = `${RoutePath.Practice}/${session.topicId}`;

  return sessionContainer;
}
