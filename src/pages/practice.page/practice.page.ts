import { EVENT, HEADINGS_TWO } from "../../constants.js";
import { widgetService } from "../../services/widget.service.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import shuffleArray from "../../utils/shuffle-array.js";
import { WidgetEngine } from "../../widgets/widget-engine.js";
import { BasePage } from "../base-page.js";

export class PracticePage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("practice-page");

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "Practice Page";

    const button = new ButtonCreator({
      text: "To library page",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    button.dataset.route = RoutePath.Library;

    window.addEventListener(EVENT.hashchange, () => {
      void this.loadWidgets();
    });
  }

  private async loadWidgets() {
    const topic = this.getTopicFromUrl();

    if (topic !== undefined) {
      const widgetArr = await widgetService.getWidgetsByTopicId(topic);
      if (widgetArr) {
        const widgetEngine = new WidgetEngine(
          shuffleArray(widgetArr),
          this.container,
        );
        widgetEngine.startSession();
      }
    }
  }

  private getTopicFromUrl() {
    const hash = location.hash;
    const topicPath = hash.split("/")[2];

    return topicPath;
  }
}
