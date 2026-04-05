import resultsScreenComponent from "../components/practice.components/results-screen.component/results-screen.component.js";
import {
  CLASS_NAME,
  EVENT,
  HALF_SECOND_DELAY,
  ONE_SECOND_DELAY,
} from "../constants.js";
import { WidgetStrategy } from "../interfaces/widget-strategy.interface.js";
import { WidgetType } from "../types/widget-type.type.js";
import { Widget, WidgetAnswerMap, WidgetMap } from "../types/widget.type.js";
import ButtonCreator from "../utils/button/button-creator.js";
import ElementCreator from "../utils/element-creator.js";
import ParagraphCreator from "../utils/paragraph/paragraph-creator.js";
import { asyncSorterStrategy } from "./async-sorter.widget/async-sorter.strategy.js";
import { codeCompletionStrategy } from "./code-completion.widget/code-completion.strategy.js";
import { codeOrderingStrategy } from "./code-ordering.widget/code-ordering.strategy.js";
import { memoryGameStrategy } from "./memory-game.widget/memory-game.strategy.js";
import { quizStrategy } from "./quiz.widget/quiz.strategy.js";
import { stackBuilderStrategy } from "./stack-builder.widget/stack-builder.strategy.js";
import { trueFalseStrategy } from "./true-false.widget/true-false.strategy.js";
import "../pages/practice.page/practice.page.css";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../pages/practice.page/practice.page.js";
import loaderComponent from "../components/loader.component/loader.component.js";
import { delay } from "../utils/delay.js";
import renderUserProgress from "../components/practice.components/user-progress-component/user-progress-component.js";
import { PracticeSession } from "../interfaces/practice-session.interface.js";
import {
  deleteSession,
  getSession,
  updateSession,
} from "../local-storage/current-session.js";
import { addSession } from "../local-storage/practice-sessions.js";
import { updateProgress } from "../local-storage/progress.js";
import { dashboardUI } from "../pages/dashboard.page/dashboard.page.js";

const widgetStrategies: {
  [K in WidgetType]: WidgetStrategy<WidgetMap[K], WidgetAnswerMap[K]>;
} = {
  quiz: quizStrategy,
  "true-false": trueFalseStrategy,
  "code-completion": codeCompletionStrategy,
  "code-ordering": codeOrderingStrategy,
  "memory-game": memoryGameStrategy,
  "stack-builder": stackBuilderStrategy,
  "async-sorter": asyncSorterStrategy,
};

export class WidgetEngine {
  private widgets: Widget[];
  private userAnswersCheckArr: boolean[] = [];
  private currentIndex = 0;
  private container;
  private widgetContainer: HTMLElement;
  private userProgress: HTMLElement | undefined;
  private isNextButtonPressed: boolean = false;

  constructor(widgets: Widget[], container: HTMLElement) {
    this.widgets = widgets;
    this.container = container;
    this.widgetContainer = new ElementCreator({
      parent: this.container,
      classes: [CLASS_NAMES_PRACTICE.widgetContainer],
    }).getElement();
  }

  render<T extends WidgetType>(widget: WidgetMap[T] & { type: T }) {
    const strategy = widgetStrategies[widget.type];

    this.container.innerHTML = "";
    this.widgetContainer.innerHTML = "";
    this.widgetContainer.append(
      strategy.render(widget, (answer) =>
        this.handleAnswer(widget, strategy, answer),
      ),
    );
    this.container.append(this.widgetContainer);
    this.userProgress = renderUserProgress(
      this.userAnswersCheckArr,
      this.widgets,
      this.isNextButtonPressed,
    );
    this.container.append(this.userProgress);

    this.isNextButtonPressed = false;
  }

  private handleAnswer<T extends WidgetType>(
    widget: WidgetMap[T],
    strategy: WidgetStrategy<WidgetMap[T], WidgetAnswerMap[T]>,
    answer: WidgetAnswerMap[T],
  ) {
    const correct = strategy.validate(widget, answer);
    updateSession(correct, widget, new Date().toISOString());
    this.showResult(correct);
  }

  private showResult(correct: boolean) {
    const resultText = new ParagraphCreator({
      parent: this.widgetContainer,
      classes: [CLASS_NAMES_PRACTICE.widgetResultText, CLASS_NAME.cardElement],
      text: correct
        ? STRING_CONSTANTS_PRACTICE.correctAnswer
        : STRING_CONSTANTS_PRACTICE.wrongAnswer,
    }).getElement();

    this.userAnswersCheckArr.push(correct);

    this.userProgress?.remove();
    this.userProgress = renderUserProgress(
      this.userAnswersCheckArr,
      this.widgets,
      this.isNextButtonPressed,
    );
    this.container.append(this.userProgress);

    this.isNextButtonPressed = false;

    resultText.classList.add(
      correct ? CLASS_NAMES_PRACTICE.correct : CLASS_NAMES_PRACTICE.wrong,
    );

    const nextButton = new ButtonCreator({
      parent: this.widgetContainer,
      text: STRING_CONSTANTS_PRACTICE.next,
      classes: [CLASS_NAME.button],
    }).getElement();

    if (this.currentIndex >= this.widgets.length - 1) {
      nextButton.textContent = STRING_CONSTANTS_PRACTICE.goToResults;
    }

    nextButton.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    nextButton.addEventListener(EVENT.click, () => {
      this.isNextButtonPressed = true;
      this.currentIndex += 1;

      if (this.currentIndex >= this.widgets.length) {
        this.container.innerHTML = "";
        this.widgetContainer.innerHTML = "";
        this.container.append(resultsScreenComponent(this.widgets));
        this.updateLocalData();
        return;
      }

      this.renderCurrentWidget();
    });
  }

  startSession() {
    const loader = loaderComponent();

    this.container.append(loader);
    delay(ONE_SECOND_DELAY)
      .then(() => this.renderCurrentWidget())
      .then(() => delay(HALF_SECOND_DELAY))
      .then(() => {
        loader.remove();
      })
      .catch(() => {
        loader.remove();
      });
  }

  private renderCurrentWidget() {
    const widget = this.widgets[this.currentIndex];
    if (widget) {
      this.render(widget);
    }
  }

  updateLocalData() {
    const currentSession: PracticeSession | undefined = getSession();
    if (currentSession === undefined) {
      throw new Error("Something went wrong. Please, try again.");
    }
    addSession(currentSession);
    updateProgress();
    deleteSession();
    dashboardUI.updateDashboardElements();
  }
}
