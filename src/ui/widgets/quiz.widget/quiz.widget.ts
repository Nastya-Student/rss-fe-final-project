import { HEADINGS_TWO } from "../../../constants.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import "./quiz.widget.css";

export default function quizWidget(): HTMLElement {
  const quizWidgetContainer = new ElementCreator({
    classes: ["quiz-widget-container"],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: quizWidgetContainer,
    text: "Quiz Widget",
  }).getElement();

  return quizWidgetContainer;
}
