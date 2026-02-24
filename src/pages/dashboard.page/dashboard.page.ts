import nextPrevComponent from "../../components/dashboard.components/next-prev.component/next-prev.component.js";
import progressComponent from "../../components/dashboard.components/progress.component/progress.component.js";
import sessionHistoryComponent from "../../components/dashboard.components/session-history.component/session-history.component.js";
import sessionComponent from "../../components/dashboard.components/session.component/session.component.js";
import { PracticeSession } from "../../interfaces/practice-session.interface.js";
import { TopicProgress } from "../../interfaces/topic-progress.interface.js";
import { User } from "../../interfaces/user.interface.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import { BasePage } from "../base-page.js";
import "./dashboard.css";

export class DashboardPage extends BasePage {
  private currentPage = 1;
  private totalPages = 1;
  private SESSION_PER_PAGE = 3;
  private userSessionArr: PracticeSession[] = [];

  private _sessionsContainer?: HTMLElement;
  private pagination?: {
    container: HTMLElement;
    update: (currentPage: number, totalPages: number) => void;
  };

  private get sessionsContainer(): HTMLElement {
    if (!this._sessionsContainer) {
      throw new Error("sessionsContainer is not initialized");
    }
    return this._sessionsContainer;
  }

  private renderSessions() {
    this.sessionsContainer.innerHTML = "";

    this.totalPages = Math.ceil(
      this.userSessionArr.length / this.SESSION_PER_PAGE,
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
    userGreeting.textContent = `Hello, ${tempUser.name}!`;

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
      {
        id: "p5",
        userId: "u1",
        topicId: "typescript",
        topicTitle: "Typescript",
        completedWidgetIds: ["w4"],
        percent: 20,
        updatedAt: "2026-02-22",
      },
      {
        id: "p6",
        userId: "u1",
        topicId: "html",
        topicTitle: "HTML",
        completedWidgetIds: ["w1", "w3", "w4"],
        percent: 45,
        updatedAt: "2026-02-23",
      },
    ];

    const sessionArr: PracticeSession[] = [
      {
        id: "s1",
        userId: "u1",
        topicId: "core-js",
        topicTitle: "Core JS",
        answers: [
          { widgetId: "w1", isCorrect: true, timeSpent: 12 },
          { widgetId: "w2", isCorrect: true, timeSpent: 8 },
        ],
        score: 85,
        startedAt: "2026-02-22T10:00:00",
        completedAt: "2026-02-22T10:10:00",
      },
      {
        id: "s2",
        userId: "u1",
        topicId: "algorithms",
        topicTitle: "Algorithms",
        answers: [{ widgetId: "w4", isCorrect: true, timeSpent: 20 }],
        score: 70,
        startedAt: "2026-02-23T11:00:00",
        completedAt: "2026-02-23T11:15:00",
      },
      {
        id: "s3",
        userId: "u2",
        topicId: "core-js",
        topicTitle: "Core JS",
        answers: [{ widgetId: "w1", isCorrect: false, timeSpent: 15 }],
        score: 0,
        startedAt: "2026-02-22T12:00:00",
        completedAt: "2026-02-22T12:05:00",
      },
      {
        id: "s4",
        userId: "u3",
        topicId: "typescript",
        topicTitle: "Typescript",
        answers: [
          { widgetId: "w6", isCorrect: true, timeSpent: 10 },
          { widgetId: "w7", isCorrect: true, timeSpent: 12 },
        ],
        score: 100,
        startedAt: "2026-02-22T09:00:00",
        completedAt: "2026-02-22T09:20:00",
      },
      {
        id: "s5",
        userId: "u1",
        topicId: "typescript",
        topicTitle: "Typescript",
        answers: [{ widgetId: "w4", isCorrect: true, timeSpent: 20 }],
        score: 54,
        startedAt: "2026-02-20T11:00:00",
        completedAt: "2026-02-20T11:15:00",
      },
      {
        id: "s6",
        userId: "u1",
        topicId: "html",
        topicTitle: "HTML",
        answers: [{ widgetId: "w4", isCorrect: true, timeSpent: 20 }],
        score: 90,
        startedAt: "2026-02-24T11:00:00",
        completedAt: "2026-02-24T11:15:00",
      },
      {
        id: "s7",
        userId: "u1",
        topicId: "html",
        topicTitle: "HTML",
        answers: [{ widgetId: "w4", isCorrect: true, timeSpent: 20 }],
        score: 25,
        startedAt: "2026-02-21T11:00:00",
        completedAt: "2026-02-21T11:15:00",
      },
    ];

    const userTopicProgressArr = topicProgressArr.filter(
      (topicProgress) => topicProgress.userId === tempUser.id,
    );
    this.userSessionArr = sessionArr
      .filter((session) => session.userId === tempUser.id)
      .sort((a, b) => {
        return (
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
      });

    this.container.append(progressComponent(tempUser, userTopicProgressArr));
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

    this.renderSessions();
  }
}
