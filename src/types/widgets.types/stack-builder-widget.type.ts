import { BaseWidget } from "../../interfaces/base-widget.interface.js";

export interface StackBuilderWidget extends BaseWidget {
  type: "stack-builder";

  steps: {
    line: number;
    code: string;
    correctStack: string[];
  }[];
}
