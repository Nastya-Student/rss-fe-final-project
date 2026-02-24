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
    classes: ["next-prev-container"],
  }).getElement();

  container.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest(".prev-button")) {
      prevPage();
    } else if (target.closest(".next-button")) {
      nextPage();
    }
  });

  const prevBtn = new ButtonCreator({
    parent: container,
    classes: ["prev-button", "button"],
  }).getElement();
  prevBtn.textContent = "←";

  const counter = new ParagraphCreator({
    parent: container,
    classes: ["page-counter"],
  }).getElement();

  const nextBtn = new ButtonCreator({
    parent: container,
    classes: ["next-button", "button"],
  }).getElement();
  nextBtn.textContent = "→";

  function update(currentPage: number, totalPages: number) {
    counter.textContent = `${currentPage}`;

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;

    prevBtn.disabled = prevDisabled;
    nextBtn.disabled = nextDisabled;

    prevBtn.classList.toggle("no-active", prevDisabled);
    nextBtn.classList.toggle("no-active", nextDisabled);
  }

  return { container, update };
}
