import { HEADINGS_TWO } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";
import ElementCreator from "../../utils/element-creator.js";

export class LandingPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("landing-page");

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "Landing Page";

    const loginButton = new ButtonCreator({
      text: "To login page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    loginButton.dataset.route = RoutePath.Login;

    const registerButton = new ButtonCreator({
      text: "To register page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    registerButton.dataset.route = RoutePath.Register;

    const Wrapper = new ElementCreator({
      tag: "div",
      parent: this.container,
    }).getElement();
    const Div1 = new ElementCreator({
      tag: "div",
      text: "div1!",
      parent: Wrapper,
    }).getElement();
    Div1.style = "color: blue";
  }
}
