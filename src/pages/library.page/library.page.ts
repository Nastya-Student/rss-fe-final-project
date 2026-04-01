import "./library.page.style.css";
import "../landing.page/landing.page.css";

import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";

import { topicService } from "../../services/topic.service.js";
import { widgetService } from "../../services/widget.service.js";
import { topicProgressService } from "../../services/topic-progress.service";
import { userService } from "../../services/user.service";

type Topic = {
  id: string;
  title: string;
  description: string;
  difficulty: number;
};

type Widget = {
  id: string;
  topicId: string;
};

type Progress = {
  userId: string;
  topicId: string;
  completedWidgetIds: string[];
};

export class LibraryPage extends BasePage {
  private userId?: string;
  private topics?: Topic[];
  private widgets?: Widget[];
  private progress?: Progress[];

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("library-page");

    void this.initLibrary();
  }

  private async initLibrary(): Promise<void> {
    const loader = createElement("div", {
      className: "loader",
      textContent: "Loading...",
    });

    this.container.append(loader);

    const user = await userService.getUserById("u1");
    if (!user) {
      loader.remove();
      return;
    }

    this.userId = user.id;

    const [topics, widgets, progress] = await Promise.all([
      topicService.getTopics(),
      widgetService.getWidgets(),
      topicProgressService.getTopicProgressByUserId(user.id),
    ]);

    if (!topics || !widgets) {
      loader.remove();
      return;
    }

    this.topics = topics;
    this.widgets = widgets;
    this.progress = progress ?? [];

    this.renderTopics();

    loader.remove();
  }

  private renderTopics(): void {
    if (!this.topics || !this.widgets) return;

    const wrapper = createElement("div", {
      className: "library-wrapper",
    });

    const title = createElement("h2", {
      className: "library-title",
      textContent: "Library",
    });

    const cards = createElement("ul", {
      className: "library-cards",
    });

    for (const topic of this.topics) {
      const topicWidgets = this.widgets.filter((w) => w.topicId === topic.id);

      const topicProgress = this.progress?.find(
        (p) => p.userId === this.userId && p.topicId === topic.id,
      );

      const completed = topicProgress?.completedWidgetIds.length ?? 0;
      const total = topicWidgets.length;
      const percent = total ? Math.round((completed / total) * 100) : 0;

      const card = createElement("li", {
        className: "library-card",
      });

      const type = createElement("span", {
        className: "library-card-type",
        textContent: "Topic",
      });

      const topicTitle = createElement("h3", {
        className: "library-card-title",
        textContent: topic.title,
      });

      const description = createElement("p", {
        className: "library-card-description",
        textContent: topic.description,
      });

      const progressText = createElement("p", {
        className: "library-card-description",
        textContent: `${completed}/${total} widgets • ${percent}% complete`,
      });

      const startBtn = createElement("button", {
        className: "button",
        textContent: "Start",
      });

      startBtn.dataset.route = `/practice/${topic.id}`;

      card.append(type, topicTitle, description, progressText, startBtn);
      cards.append(card);
    }

    wrapper.append(title, cards);

    this.container.replaceChildren(wrapper);
  }
}
