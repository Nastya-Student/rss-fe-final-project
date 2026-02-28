import { BaseWidget } from "../base-widget.interface.js";

export interface CodeCompletionWidget extends BaseWidget {
  type: "code-completion";
  code: string;
  blanks: string[];
  correctAnswers: string[];
}
