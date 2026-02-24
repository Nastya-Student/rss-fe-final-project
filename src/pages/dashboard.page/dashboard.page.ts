import progressComponent from "../../components/dashboard.components/progress.component/progress.component.js";
import { TopicProgress } from "../../interfaces/topic-progress.interface.js";
import { User } from "../../interfaces/user.interface.js";
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
      classes: ["dashboard__user-greeting"],
    }).getElement();

    const tempUser: User = {
      id: "u1",
      name: "Ivan",
      email: "ivan@mail.com",
      passwordHash: "hashed",
      xp: 120,
      streak: 5,
      createdAt: "2026-02-20",
    };

    const topicProgressArr: TopicProgress[] = [
      {
        id: "p1",
        userId: "u1",
        topicId: "core-js",
        topicTitle: "Core JS",
        completedWidgetIds: ["w1", "w2"],
        percent: 66,
        updatedAt: "2026-02-22",
      },
      {
        id: "p2",
        userId: "u1",
        topicId: "algorithms",
        topicTitle: "Algorithms",
        completedWidgetIds: ["w4"],
        percent: 50,
        updatedAt: "2026-02-23",
      },
      {
        id: "p3",
        userId: "u2",
        topicId: "core-js",
        topicTitle: "Core JS",
        completedWidgetIds: ["w1"],
        percent: 33,
        updatedAt: "2026-02-22",
      },
      {
        id: "p4",
        userId: "u3",
        topicId: "typescript",
        topicTitle: "Typescript",
        completedWidgetIds: ["w6", "w7"],
        percent: 100,
        updatedAt: "2026-02-22",
      },
    ];

    const userTopicProgressArr = topicProgressArr.filter(
      (topicProgress) => topicProgress.userId === tempUser.id,
    );

    userGreeting.textContent = `Hello, ${tempUser.name}!`;

    this.container.append(progressComponent(tempUser, userTopicProgressArr));

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
