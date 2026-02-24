import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import ButtonCreator from "../../../utils/button/button-creator.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import "./session.component.css";

export default function sessionComponent(
  session: PracticeSession,
): HTMLElement {
  const sessionContainer = new ElementCreator({
    classes: ["dashboard__session-container"],
  }).getElement();

  const sessionTopicTitle = new ParagraphCreator({
    classes: ["dashboard__session-topic-title"],
    parent: sessionContainer,
  }).getElement();
  sessionTopicTitle.textContent = session.topicTitle;

  const sessionTopicScore = new ParagraphCreator({
    classes: ["dashboard__session-topic-score"],
    parent: sessionContainer,
  }).getElement();
  sessionTopicScore.textContent = `${session.score.toString()}/100`;

  const sessionTopicDate = new ParagraphCreator({
    classes: ["dashboard__session-topic-date"],
    parent: sessionContainer,
  }).getElement();
  const completedAt = new Date(session.completedAt);
  sessionTopicDate.textContent = completedAt.toLocaleDateString("ru-RU");

  const sessionTopicButton = new ButtonCreator({
    classes: ["dashboard__session-topic-button", "button"],
    parent: sessionContainer,
  }).getElement();
  sessionTopicButton.dataset.route = `/practice/${session.topicId}`;

  return sessionContainer;
}
