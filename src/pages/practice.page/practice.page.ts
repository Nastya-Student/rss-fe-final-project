import { HEADINGS_TWO } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";

export class PracticePage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("practice-page");

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "Practice Page";

    const button = new ButtonCreator({
      text: "To library page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    button.dataset.route = RoutePath.Library;
  }
}
