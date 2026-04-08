import "./library.page.css";
import "../landing.page/landing.page.css";

import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";

import { topicService } from "../../services/topic.service.js";

import { getUser } from "../../local-storage/user.js";
import { getProgress } from "../../local-storage/progress.js";

import type { Topic } from "../../interfaces/topic.interface.js";

type Progress = {
  userId: string;
  topicId: string;
  completedWidgetIds: string[];
};

export class LibraryPage extends BasePage {
  private topics?: Topic[];
  private progressMap = new Map<string, Progress>();

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

    const user = getUser();
    if (user === undefined) {
      loader.remove();
      return;
    }

    const topics = await topicService.getTopics();
    if (!topics) {
      loader.remove();
      return;
    }

    this.topics = topics;

    const progress = getProgress() ?? [];

    for (const p of progress) {
      this.progressMap.set(p.topicId, p);
    }

    this.renderTopics();
    loader.remove();
  }

  private renderTopics(): void {
    if (!this.topics) return;

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
      const topicProgress = this.progressMap.get(topic.id);
      const completed = topicProgress?.completedWidgetIds.length ?? 0;

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
        textContent: `Completed: ${completed}`,
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
