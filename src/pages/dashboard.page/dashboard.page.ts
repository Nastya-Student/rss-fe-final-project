import progressComponent from "../../components/dashboard.components/progress.component/progress.component.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import { BasePage } from "../base-page.js";
import "./dashboard.css";

export class DashboardPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("dashboard-page");

    const userGreeting = new ParagraphCreator({
      parent: this.container,
    }).getElement();
    const tempUser = " Oleg";
    userGreeting.textContent = `Hello, ${tempUser}!`;

    this.container.append(progressComponent());

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
