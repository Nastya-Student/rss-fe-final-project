import { TopicProgress } from "../../../interfaces/topic-progress.interface.js";
import ElementCreator from "../../../utils/element-creator.js";
import progressBarComponent from "../progress-bar.component/progress-bar.component.js";
import "./progress.component.css";

export const TOTAL_PROGRESS = "Total Progress";

export default function progressComponent(
  topicProgressArr: TopicProgress[],
): HTMLElement {
  const progressContainer = new ElementCreator({
    classes: ["dashboard__progress-container"],
  }).getElement();

  const topicsProgressContainer = new ElementCreator({
    classes: ["dashboard__topics-progress-container"],
  }).getElement();

  let totalPercent = 0;

  for (const topicProgress of topicProgressArr) {
    topicsProgressContainer.append(
      progressBarComponent(topicProgress.topicTitle, topicProgress.percent),
    );
    totalPercent += topicProgress.percent;
  }

  topicsProgressContainer.prepend(
    progressBarComponent(
      TOTAL_PROGRESS,
      Math.floor(totalPercent / topicProgressArr.length),
    ),
  );

  progressContainer.append(topicsProgressContainer);

  const streakContainer = new ElementCreator({
    classes: ["dashboard__streak-container"],
    parent: progressContainer,
  }).getElement();
  streakContainer.textContent = "";

  return progressContainer;
}
