import { WidgetStrategy } from "../../interfaces/widget-strategy.interface.js";
import { MemoryGameAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import { MemoryGameWidget } from "../../types/widget.type.js";
import memoryGameWidget from "./memory-game.widget.js";

export const memoryGameStrategy: WidgetStrategy<
  MemoryGameWidget,
  MemoryGameAnswer
> = {
  type: "memory-game",

  render(widget, onAnswer) {
    return memoryGameWidget(widget.payload, onAnswer);
  },

  validate(widget, answer) {
    return answer.answer === widget.payload.links;
  },
};
