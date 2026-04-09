import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { AsyncSorterAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import { AsyncSorterWidget } from "../../types/widget.type.js";
import asyncSorterWidget from "./async-sorter.widget.js";

export const asyncSorterStrategy: WidgetStrategy<
  AsyncSorterWidget,
  AsyncSorterAnswer
> = {
  type: "async-sorter",

  render(widget, onAnswer) {
    return asyncSorterWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    const correct = widget.payload.buckets;
    const answerMap = new Map(
      answer.answer.map((bucket) => [bucket.name, bucket.items]),
    );

    return correct.every((bucket) => {
      const answerItems = answerMap.get(bucket.name);
      if (!answerItems) {
        return false;
      }

      if (answerItems.length !== bucket.correctItems.length) {
        return false;
      }

      return bucket.correctItems.every(
        (item: string, index: number) => item === answerItems[index],
      );
    });
  },
};
