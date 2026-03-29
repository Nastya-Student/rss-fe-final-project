import { HEADINGS_TWO } from "../../constants";
import { PracticeSession } from "../../interfaces/practice-session.interface";
import { Widget } from "../../types/widget.type";
import ElementCreator from "../../utils/element-creator";
import HeadingsCreator from "../../utils/headings/headings-creator";
import ListItemCreator from "../../utils/list-item/list-item-creator";
import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator";

export const renderResultScreen = (
  session: PracticeSession,
  widgets: Widget[],
) => {
  const container = document.querySelector<HTMLElement>(
    ".practice__results-screen-container",
  );

  if (!container) {
    return;
  }

  const resultBlock = new ElementCreator({
    classes: ["result__block"],
    parent: container,
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    text: session.topicTitle,
    classes: ["result__title"],
    parent: resultBlock,
  }).getElement();

  const answersList = new UnorderedListCreator({
    classes: ["result__answers-list"],
    parent: resultBlock,
  }).getElement();

  const answers = session.answers;
  for (const item of answers) {
    const widgetId = item.widgetId;
    const widget = widgets.find((item) => item.id === widgetId);
    if (!widget) {
      return;
    }
    const question = widget.topicId;
    const answer = item.isCorrect;

    const answersItem = new ListItemCreator({
      classes: ["result__answers-item"],
      parent: answersList,
    }).getElement();

    new ElementCreator({
      text: question,
      classes: ["result__question"],
      parent: answersItem,
    }).getElement();

    new ElementCreator({
      text: String(answer),
      classes: ["result__answer"],
      parent: answersItem,
    }).getElement();
  }
};
