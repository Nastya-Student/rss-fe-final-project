import { HEADINGS_TWO } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ImageCreator from "../../utils/image/image-creator.js";
import { BasePage } from "../base-page.js";
import image404 from "../../assets/svg/404.svg";
import "./error.css";

export class ErrorPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("error-page");

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "404";

    new ImageCreator({
      parent: this.container,
      classes: ["error__image"],
      src: image404,
      alt: "Error Image",
    });

    const button = new ButtonCreator({
      text: "To dashboard page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    button.dataset.route = RoutePath.Dashboard;
  }
}
