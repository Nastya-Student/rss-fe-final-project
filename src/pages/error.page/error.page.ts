import { CLASS_NAME } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ImageCreator from "../../utils/image/image-creator.js";
import { BasePage } from "../base-page.js";
import image404 from "../../assets/svg/404.svg";
import "./error.css";

export class ErrorPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("error-page");

    new ImageCreator({
      parent: this.container,
      classes: ["error__image"],
      src: image404,
      alt: "Error Image",
    });

    const button = new ButtonCreator({
      text: "Go to Home page",
      classes: [CLASS_NAME.button],
      parent: this.container,
    }).getElement();
    button.dataset.route = RoutePath.Landing;
  }
}
