import { CLASS_NAME } from "../../../constants.js";
import { CLASS_NAMES_PRACTICE } from "../../../pages/practice.page/practice.page.js";
import { Widget } from "../../../types/widget.type.js";
import ElementCreator from "../../../utils/element-creator.js";
import "./user-progress-component.css";

export default function renderUserProgress(
  userAnswersCheckArr: boolean[],
  widgets: Widget[],
  isNextButtonPressed: boolean,
): HTMLElement {
  const container = new ElementCreator({
    classes: [
      CLASS_NAMES_PRACTICE.userProgressContainer,
      CLASS_NAME.cardElement,
    ],
  }).getElement();

  const circles: HTMLElement[] = [];

  for (let i = 0; i < widgets.length; i++) {
    circles[i] = new ElementCreator({
      parent: container,
      classes: [CLASS_NAMES_PRACTICE.progressCircle, CLASS_NAME.noActive],
    }).getElement();
  }

  if (userAnswersCheckArr.length === 0) {
    circles[0]?.classList.add(CLASS_NAME.active);
    return container;
  }

  for (const [i, element] of userAnswersCheckArr.entries()) {
    const circle = circles[i];
    if (!circle) continue;

    circle.classList.remove(CLASS_NAME.active);
    circle.classList.add(
      element ? CLASS_NAMES_PRACTICE.correct : CLASS_NAMES_PRACTICE.wrong,
    );
  }

  const activeIndex = isNextButtonPressed
    ? userAnswersCheckArr.length
    : userAnswersCheckArr.length - 1;

  circles[activeIndex]?.classList.add(CLASS_NAME.active);

  return container;
}
