import "./library.page.style.css";
import "../landing.page/landing.page.css";

import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";

import topics from "../../data/mock-topics.data.json";
import widgets from "../../data/mock-widgets.data.json";
import progress from "../../data/mock-progress.data.json";

type Topic = {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  widgetIds: string[];
};

type Widget = {
  id: string;
};

type Progress = {
  userId: string;
  topicId: string;
  completedWidgetIds: string[];
};

export class LibraryPage extends BasePage {
  private currentUserId = "u1";

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("library-page");

    this.renderTopics();
  }

  private renderTopics(): void {
    const topicsData: Topic[] = topics;
    const widgetsData: Widget[] = widgets;
    const progressData: Progress[] = progress;

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

    for (const topic of topicsData) {
      const topicWidgets = widgetsData.filter((w) =>
        topic.widgetIds.includes(w.id),
      );

      const topicProgress = progressData.find(
        (p) => p.userId === this.currentUserId && p.topicId === topic.id,
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

    this.container.append(wrapper);
  }
}
