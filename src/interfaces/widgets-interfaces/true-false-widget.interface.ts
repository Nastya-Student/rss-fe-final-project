import { BaseWidget } from "../base-widget.interface.js";

export interface TrueFalseWidget extends BaseWidget {
  type: "true-false";
  statement: string;
  correct: boolean;
  explanation: string;
}
