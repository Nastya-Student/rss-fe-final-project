import { CLASS_NAME } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ImageCreator from "../../utils/image/image-creator.js";
import { BasePage } from "../base-page.js";
import image404 from "../../assets/svg/404.svg";
import "./error.css";

export const CLASS_NAMES_ERROR = {
  page: "error-page",
  errorImage: "error__image",
} as const;

export const STRING_CONSTANTS_ERROR = {
  errorImageAlt: "Error Image",
  buttonText: "Go to Home page",
} as const;

export class ErrorPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add(CLASS_NAMES_ERROR.page);

    new ImageCreator({
      parent: this.container,
      classes: [CLASS_NAMES_ERROR.errorImage],
      src: image404,
      alt: STRING_CONSTANTS_ERROR.errorImageAlt,
    });

    const button = new ButtonCreator({
      text: STRING_CONSTANTS_ERROR.buttonText,
      classes: [CLASS_NAME.button],
      parent: this.container,
    }).getElement();
    button.dataset.route = RoutePath.Landing;
  }
}
