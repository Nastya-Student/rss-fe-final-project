import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import ProgressCreator from "../../../utils/progress/progress-creator.js";
import { TOTAL_PROGRESS } from "../progress.component/progress.component.js";
import "./progress-bar.component.css";

export default function progressBarComponent(
  progressTitle: string,
  progressPercent: number,
): HTMLElement {
  const progressTopicContainer = new ElementCreator({
    classes: ["dashboard__progress-topic-container"],
  }).getElement();

  const topicTitle = new ParagraphCreator({
    parent: progressTopicContainer,
    classes: ["dashboard__progress-topic-title"],
  }).getElement();
  topicTitle.textContent = progressTitle;

  const progressPercentContainer = new ElementCreator({
    classes: ["dashboard__topic-progress-percent-container"],
    parent: progressTopicContainer,
  }).getElement();

  new ProgressCreator({
    max: 100,
    value: progressPercent,
    parent: progressPercentContainer,
    classes: ["dashboard__topic-progress"],
  }).getElement();

  const topicPercent = new ParagraphCreator({
    parent: progressPercentContainer,
    classes: ["dashboard__topic-percent"],
  }).getElement();

  topicPercent.textContent = `${progressPercent}%`;

  if (progressTitle === TOTAL_PROGRESS) {
    progressTopicContainer.classList.add("dashboard__total-progress");
    progressPercentContainer.classList.add("dashboard__total-progress");
    topicPercent.classList.add("dashboard__total-progress");
  }

  return progressTopicContainer;
}
