import {
  CLASS_NAMES_DASHBOARD,
  STRING_CONSTANTS_DASHBOARD,
} from "../../../pages/dashboard.page/dashboard.page.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import ProgressCreator from "../../../utils/progress/progress-creator.js";
import "./progress-bar.component.css";

export default function progressBarComponent(
  progressTitle: string,
  progressPercent: number,
): HTMLElement {
  const progressTopicContainer = new ElementCreator({
    classes: [CLASS_NAMES_DASHBOARD.progressTopicContainer],
  }).getElement();

  const topicTitle = new ParagraphCreator({
    parent: progressTopicContainer,
    classes: [CLASS_NAMES_DASHBOARD.progressTopicTitle],
  }).getElement();
  topicTitle.textContent = progressTitle;

  const progressPercentContainer = new ElementCreator({
    classes: [CLASS_NAMES_DASHBOARD.topicProgressPercentContainer],
    parent: progressTopicContainer,
  }).getElement();

  new ProgressCreator({
    max: 100,
    value: progressPercent,
    parent: progressPercentContainer,
    classes: [CLASS_NAMES_DASHBOARD.topicProgress],
  }).getElement();

  const topicPercent = new ParagraphCreator({
    parent: progressPercentContainer,
    classes: [CLASS_NAMES_DASHBOARD.topicPercent],
  }).getElement();

  topicPercent.textContent = `${progressPercent}${STRING_CONSTANTS_DASHBOARD.percent}`;

  if (progressTitle === STRING_CONSTANTS_DASHBOARD.totalProgress) {
    progressTopicContainer.classList.add(CLASS_NAMES_DASHBOARD.totalProgress);
    progressPercentContainer.classList.add(CLASS_NAMES_DASHBOARD.totalProgress);
    topicPercent.classList.add(CLASS_NAMES_DASHBOARD.totalProgress);
  }

  return progressTopicContainer;
}
