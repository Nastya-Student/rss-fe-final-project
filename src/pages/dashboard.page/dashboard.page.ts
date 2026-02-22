import { HEADINGS_TWO } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";

export class DashboardPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("dashboard-page");

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "Dashboard Page";

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

    const libraryButton = new ButtonCreator({
      text: "To library page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    libraryButton.dataset.route = RoutePath.Library;
  }
}
