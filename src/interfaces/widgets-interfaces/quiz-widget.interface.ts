import { BaseWidget } from "../base-widget.interface.js";

export interface QuizWidget extends BaseWidget {
  type: "quiz";
  question: string;
  options: string[];
  correctIndex: number;
}
