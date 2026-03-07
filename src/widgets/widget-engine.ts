import resultsScreenComponent from "../components/practice.components/results-screen.component/results-screen.component.js";
import { CLASS_NAME, EVENT } from "../constants.js";
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
  private currentIndex = 0;
  private container;
  private widgetContainer: HTMLElement;

  constructor(widgets: Widget[], container: HTMLElement) {
    this.widgets = widgets;
    this.container = container;
    this.widgetContainer = new ElementCreator({
      parent: this.container,
      classes: ["widget-container"],
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
  }

  private handleAnswer<T extends WidgetType>(
    widget: WidgetMap[T],
    strategy: WidgetStrategy<WidgetMap[T], WidgetAnswerMap[T]>,
    answer: WidgetAnswerMap[T],
  ) {
    const correct = strategy.validate(widget, answer);

    this.showResult(correct);
  }

  private showResult(correct: boolean) {
    new ParagraphCreator({
      parent: this.widgetContainer,
      classes: [CLASS_NAME.cardElement],
      text: correct ? "Correct" : "Wrong",
    }).getElement();

    const nextButton = new ButtonCreator({
      parent: this.widgetContainer,
      text: "Next",
      classes: [CLASS_NAME.button],
    }).getElement();

    if (this.currentIndex >= this.widgets.length - 1) {
      nextButton.textContent = "Go to Results";
    }

    nextButton.addEventListener(EVENT.click, () => {
      this.currentIndex += 1;

      if (this.currentIndex >= this.widgets.length) {
        this.container.innerHTML = "";
        this.widgetContainer.innerHTML = "";
        this.container.append(resultsScreenComponent());
        return;
      }

      this.renderCurrentWidget();
    });
  }

  startSession() {
    this.renderCurrentWidget();
  }

  private renderCurrentWidget() {
    const widget = this.widgets[this.currentIndex];
    if (widget) {
      this.render(widget);
    }
  }
}
