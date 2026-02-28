import nextPrevComponent from "../../components/dashboard.components/next-prev.component/next-prev.component.js";
import progressComponent from "../../components/dashboard.components/progress.component/progress.component.js";
import sessionHistoryComponent from "../../components/dashboard.components/session-history.component/session-history.component.js";
import sessionComponent from "../../components/dashboard.components/session.component/session.component.js";
import { PracticeSession } from "../../interfaces/practice-session.interface.js";
import { TopicProgress } from "../../interfaces/topic-progress.interface.js";
import { User } from "../../interfaces/user.interface.js";
import { practiceSessionService } from "../../services/practice-session.service.js";
import { topicProgressService } from "../../services/topic-progress.service.js";
import { userService } from "../../services/user.service.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import { BasePage } from "../base-page.js";
import "./dashboard.css";

export class DashboardPage extends BasePage {
  private currentPage = 1;
  private totalPages = 1;
  private SESSION_PER_PAGE = 3;
  private USER_ID = "u1";

  private userSessionArr?: PracticeSession[];
  private userTopicArr?: TopicProgress[];
  private user?: User | undefined;

  private _userGreeting?: HTMLParagraphElement;
  private _progressContainer?: HTMLElement;
  private _sessionsContainer?: HTMLElement;
  private pagination?: {
    container: HTMLElement;
    update: (currentPage: number, totalPages: number) => void;
  };

  private get userGreeting(): HTMLElement {
    if (!this._userGreeting) {
      throw new Error("userGreeting is not initialized");
    }
    return this._userGreeting;
  }

  private get progressContainer(): HTMLElement {
    if (!this._progressContainer) {
      throw new Error("progressContainer is not initialized");
    }
    return this._progressContainer;
  }

  private get sessionsContainer(): HTMLElement {
    if (!this._sessionsContainer) {
      throw new Error("sessionsContainer is not initialized");
    }
    return this._sessionsContainer;
  }

  private renderSessions() {
    this.sessionsContainer.innerHTML = "";
    if (this.userSessionArr === undefined) {
      return;
    }

    this.totalPages = Math.max(
      1,
      Math.ceil(this.userSessionArr.length / this.SESSION_PER_PAGE),
    );

    const start = (this.currentPage - 1) * this.SESSION_PER_PAGE;
    const end = start + this.SESSION_PER_PAGE;

    const pageSessions = this.userSessionArr.slice(start, end);

    for (const session of pageSessions) {
      this.sessionsContainer.append(sessionComponent(session));
    }

    this.pagination?.update(this.currentPage, this.totalPages);
  }

  private prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.renderSessions();
    }
  }

  private nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.renderSessions();
    }
  }

  private async initDashboardElements(): Promise<void> {
    this.user = await userService.getUserById(this.USER_ID);
    if (this.user === undefined) {
      return;
    }
    this.userGreeting.textContent = `Hello, ${this.user.name}!`;

    this.userTopicArr =
      (await topicProgressService.getTopicProgressByUserId(this.user.id)) ?? [];
    if (this.userTopicArr === undefined) {
      return;
    }

    this.progressContainer.innerHTML = "";
    const { topicsProgressContainer, streakContainer } = progressComponent(
      this.user,
      this.userTopicArr,
    );
    this.progressContainer.append(topicsProgressContainer);
    this.progressContainer.append(streakContainer);

    this.userSessionArr =
      (await practiceSessionService.getPracticeSessionsByUserId(
        this.user.id,
      )) ?? [];
    if (this.userSessionArr === undefined) {
      return;
    }
    this.userSessionArr.sort((a, b) => {
      return (
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
    });

    this.renderSessions();
  }

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("dashboard-page");

    this._userGreeting = new ParagraphCreator({
      parent: this.container,
      classes: ["dashboard__user-greeting"],
    }).getElement();
    this.userGreeting.textContent = "Hello, User!";

    this._progressContainer = new ElementCreator({
      parent: this.container,
      classes: ["dashboard__progress-container"],
    }).getElement();

    const { sessionHistoryContainer, sessionsContainer } =
      sessionHistoryComponent();
    this.container.append(sessionHistoryContainer);

    this._sessionsContainer = sessionsContainer;

    this.pagination = nextPrevComponent(
      () => {
        this.prevPage();
      },
      () => {
        this.nextPage();
      },
    );

    this.container.append(this.pagination.container);

    const startPracticing = new ButtonCreator({
      text: "Start practicing",
      classes: ["dashboard__start-practicing", "button"],
      parent: this.container,
    }).getElement();
    startPracticing.dataset.route = RoutePath.Library;

    this.initDashboardElements().catch(() => {
      throw new Error("Error loading dashboard");
    });
  }
}
