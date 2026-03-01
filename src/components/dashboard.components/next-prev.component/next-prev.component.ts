import { CLASS_NAME, EVENT } from "../../../constants.js";
import {
  CLASS_NAMES_DASHBOARD,
  STRING_CONSTANTS_DASHBOARD,
} from "../../../pages/dashboard.page/dashboard.page.js";
import ButtonCreator from "../../../utils/button/button-creator.js";
import ElementCreator from "../../../utils/element-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import "./next-prev.component.css";

export default function nextPrevComponent(
  prevPage: () => void,
  nextPage: () => void,
): {
  container: HTMLElement;
  update: (currentPage: number, totalPages: number) => void;
} {
  const container = new ElementCreator({
    classes: [CLASS_NAMES_DASHBOARD.nextPrevContainer],
  }).getElement();

  container.addEventListener(EVENT.click, (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(`.${CLASS_NAMES_DASHBOARD.prevButton}`)) {
      prevPage();
    } else if (target.closest(`.${CLASS_NAMES_DASHBOARD.nextButton}`)) {
      nextPage();
    }
  });

  const prevBtn = new ButtonCreator({
    parent: container,
    classes: [CLASS_NAMES_DASHBOARD.prevButton, CLASS_NAME.button],
  }).getElement();
  prevBtn.textContent = STRING_CONSTANTS_DASHBOARD.arrowLeft;

  const counter = new ParagraphCreator({
    parent: container,
    classes: [CLASS_NAMES_DASHBOARD.pageCounter],
  }).getElement();

  const nextBtn = new ButtonCreator({
    parent: container,
    classes: [CLASS_NAMES_DASHBOARD.nextButton, CLASS_NAME.button],
  }).getElement();
  nextBtn.textContent = STRING_CONSTANTS_DASHBOARD.arrowRight;

  function update(currentPage: number, totalPages: number) {
    counter.textContent = `${currentPage}`;

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;

    prevBtn.disabled = prevDisabled;
    nextBtn.disabled = nextDisabled;

    prevBtn.classList.toggle(CLASS_NAME.noActive, prevDisabled);
    nextBtn.classList.toggle(CLASS_NAME.noActive, nextDisabled);
  }

  return { container, update };
}
