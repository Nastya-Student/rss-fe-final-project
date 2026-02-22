import { HEADINGS_TWO } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";

export class LibraryPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("library-page");

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "Library Page";

    const logoutButton = new ButtonCreator({
      text: "To login page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    logoutButton.dataset.route = RoutePath.Login;

    const profileButton = new ButtonCreator({
      text: "To profile page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    profileButton.dataset.route = RoutePath.Profile;

    const coreJSButton = new ButtonCreator({
      text: "To core JS theme",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    coreJSButton.dataset.route = "/practice/coreJS";

    const typescriptButton = new ButtonCreator({
      text: "To typescript theme",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    typescriptButton.dataset.route = "/practice/typescript";
  }
}
