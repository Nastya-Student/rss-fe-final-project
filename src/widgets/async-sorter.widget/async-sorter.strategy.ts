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
    if (!widget.payload.buckets[0]) {
      return false;
    }
    const correct = widget.payload.buckets[0];

    return JSON.stringify(answer.answer) === JSON.stringify(correct);
  },
};
