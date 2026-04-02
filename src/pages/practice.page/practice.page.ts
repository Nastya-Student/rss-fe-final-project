import { CLASS_NAME, EVENT, HEADINGS_TWO } from "../../constants.js";
import { widgetService } from "../../services/widget.service.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import shuffleArray from "../../utils/shuffle-array.js";
import { WidgetEngine } from "../../widgets/widget-engine.js";
import { BasePage } from "../base-page.js";

export const CLASS_NAMES_PRACTICE = {
  page: "practice-page",
  widgetContainer: "practice__widget-container",
  widgetResultText: "practice__widget-result-text",
  correct: "correct",
  wrong: "wrong",
  resultsScreenContainer: "practice__results-screen-container",
  asyncSorterWidgetContainer: "practice__async-sorter-widget-container",
  codeCompletionWidgetContainer: "practice__code-completion-widget-container",
  codeOrderingWidgetContainer: "practice__code-ordering-widget-container",
  memoryGameWidgetContainer: "practice__memory-game-widget-container",
  quizWidgetContainer: "practice__quiz-widget-container",
  stackBuilderWidgetContainer: "practice__stack-builder-widget-container",
  trueFalseWidgetContainer: "practice__true-false-widget-container",
  submitButton: "practice__submit-button",
} as const;

export const STRING_CONSTANTS_PRACTICE = {
  correctAnswer: "Correct",
  wrongAnswer: "Wrong",
  next: "Next",
  goToResults: "Go to Results",
  submit: "Submit",
} as const;
export class PracticePage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add(CLASS_NAMES_PRACTICE.page);

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "Practice Page";

    const button = new ButtonCreator({
      text: "To library page",
      classes: [CLASS_NAME.button],
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
        const shuffledArr = shuffleArray(widgetArr);
        shuffledArr.length = 10;
        const widgetEngine = new WidgetEngine(shuffledArr, this.container);
        widgetEngine.startSession();
      }
    }
  }

  private getTopicFromUrl() {
    const hash = location.hash;
    const indexOfTopicPath = 2;
    const topicPath = hash.split("/")[indexOfTopicPath];

    return topicPath;
  }
}
