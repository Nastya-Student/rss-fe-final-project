import { WidgetStrategy } from "../interfaces/widget-strategy.interface.js";
import { WidgetType } from "../types/widget-type.type.js";
import { WidgetAnswerMap, WidgetMap } from "../types/widget.type.js";
import ParagraphCreator from "../utils/paragraph/paragraph-creator.js";
import { asyncSorterStrategy } from "./async-sorter.widget/async-sorter.strategy.js";
import { codeCompletionStrategy } from "./code-completion.widget/code-completion.strategy.js";
import { codeOrderingStrategy } from "./code-ordering.widget/code-ordering.strategy.js";
import { memoryGameStrategy } from "./memory-game.widget/memory-game.strategy.js";
import { quizStrategy } from "./quiz.widget/quiz.strategy.js";
import { stackBuilderStrategy } from "./stack-builder.widget/stack-builder.strategy.js";
import { trueFalseStrategy } from "./true-false.widget/true-false.strategy.js";

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
  private container;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render<T extends WidgetType>(widget: WidgetMap[T] & { type: T }) {
    const strategy = widgetStrategies[widget.type];

    this.container.innerHTML = "";
    this.container.append(
      strategy.render(widget, (answer) =>
        this.handleAnswer(widget, strategy, answer),
      ),
    );
  }

  private handleAnswer<T extends WidgetType>(
    widget: WidgetMap[T],
    strategy: WidgetStrategy<WidgetMap[T], WidgetAnswerMap[T]>,
    answer: WidgetAnswerMap[T],
  ) {
    new ParagraphCreator({
      parent: this.container,
      text: `Answer: ${JSON.stringify(answer)}`,
    });
    new ParagraphCreator({
      parent: this.container,
      text: `Correct: ${strategy.validate(widget, answer)}`,
    });
  }
}
