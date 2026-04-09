import { Widget } from "../types/widget.type.js";

export interface WidgetStrategy<TWidget extends Widget, TAnswer> {
  type: TWidget["type"];

  render(widget: TWidget, onAnswer: (answer: TAnswer) => void): HTMLElement;

  validate(widget: TWidget, answer: TAnswer): boolean;
}
