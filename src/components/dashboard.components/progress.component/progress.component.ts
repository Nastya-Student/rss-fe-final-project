import { TopicProgress } from "../../../interfaces/topic-progress.interface.js";
import ElementCreator from "../../../utils/element-creator.js";
import progressBarComponent from "../progress-bar.component/progress-bar.component.js";
import "./progress.component.css";

export const TOTAL_PROGRESS = "Total Progress";

export default function progressComponent(): HTMLElement {
  const progressContainer = new ElementCreator({
    classes: ["dashboard__progress-container"],
  }).getElement();

  const topicsProgressContainer = new ElementCreator({
    classes: ["dashboard__topics-progress-container"],
  }).getElement();

  const topicProgressArr: TopicProgress[] = [
    {
      topicProgressId: "0",
      userId: "0",
      completedWidgetIds: ["w1", "w2"],
      percent: 50,
      updatedAt: "string",
      topicId: "0",
      title: "CoreJS",
      description: "string",
      difficulty: 1,
      tags: ["assa", "sasa"],
      widgetIds: ["w1", "w2", "w3"],
    },
    {
      topicProgressId: "0",
      userId: "0",
      completedWidgetIds: ["w1", "w2"],
      percent: 100,
      updatedAt: "string",
      topicId: "0",
      title: "Typescript",
      description: "string",
      difficulty: 1,
      tags: ["assa", "sasa"],
      widgetIds: ["w1", "w2", "w3"],
    },
    {
      topicProgressId: "0",
      userId: "0",
      completedWidgetIds: ["w1", "w2"],
      percent: 23,
      updatedAt: "string",
      topicId: "0",
      title: "HTML",
      description: "string",
      difficulty: 1,
      tags: ["assa", "sasa"],
      widgetIds: ["w1", "w2", "w3"],
    },
    {
      topicProgressId: "0",
      userId: "0",
      completedWidgetIds: ["w1", "w2"],
      percent: 1,
      updatedAt: "string",
      topicId: "0",
      title: "CSS",
      description: "string",
      difficulty: 1,
      tags: ["assa", "sasa"],
      widgetIds: ["w1", "w2", "w3"],
    },
  ];

  let totalPercent = 0;

  for (const topicProgress of topicProgressArr) {
    topicsProgressContainer.append(
      progressBarComponent(topicProgress.title, topicProgress.percent),
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
