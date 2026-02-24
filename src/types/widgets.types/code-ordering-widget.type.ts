import { BaseWidget } from "../../interfaces/base-widget.interface.js";

export interface CodeOrderingWidget extends BaseWidget {
  type: "code-ordering";
  description: string;
  lines: string[];
  correctOrder: number[];
}
