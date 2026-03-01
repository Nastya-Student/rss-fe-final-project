import { TopicProgress } from "../../../interfaces/topic-progress.interface.js";
import { User } from "../../../interfaces/user.interface.js";
import {
  CLASS_NAMES_DASHBOARD,
  STRING_CONSTANTS_DASHBOARD,
} from "../../../pages/dashboard.page/dashboard.page.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import progressBarComponent from "../progress-bar.component/progress-bar.component.js";
import "./progress.component.css";

export default function progressComponent(
  user: User,
  topicProgressArr: TopicProgress[],
): {
  topicsProgressContainer: HTMLElement;
  streakContainer: HTMLElement;
} {
  const topicsProgressContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_DASHBOARD.topicsProgressContainer,
      CLASS_NAMES_DASHBOARD.cardElement,
    ],
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
      STRING_CONSTANTS_DASHBOARD.totalProgress,
      Math.floor(totalPercent / topicProgressArr.length),
    ),
  );

  const streakContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_DASHBOARD.streakContainer,
      CLASS_NAMES_DASHBOARD.cardElement,
    ],
  }).getElement();

  const streakText = new ParagraphCreator({
    classes: [CLASS_NAMES_DASHBOARD.streakParagraph],
    parent: streakContainer,
  }).getElement();
  streakText.textContent = `${STRING_CONSTANTS_DASHBOARD.streak}: ${user.streak} ${STRING_CONSTANTS_DASHBOARD.days}`;

  return { topicsProgressContainer, streakContainer };
}
