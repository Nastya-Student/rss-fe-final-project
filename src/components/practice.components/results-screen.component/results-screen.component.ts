import { CLASS_NAME, HEADINGS_TWO } from "../../../constants.js";
import { getSession } from "../../../local-storage/current-session.js";
import { CLASS_NAMES_PRACTICE } from "../../../pages/practice.page/practice.page.js";
import { RoutePath } from "../../../types/route-path.enum.js";
import { Widget } from "../../../types/widget.type.js";
import ButtonCreator from "../../../utils/button/button-creator.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import ListItemCreator from "../../../utils/list-item/list-item-creator.js";
import ParagraphCreator from "../../../utils/paragraph/paragraph-creator.js";
import UnorderedListCreator from "../../../utils/unordered-list/unordered-list-creator.js";
import "./results-screen.component.css";

export default function resultsScreenComponent(widgets: Widget[]): HTMLElement {
  const session = getSession();
  if (session === undefined) {
    throw new Error("please, create a local session first");
  }

  const resultsScreenContainer = new ElementCreator({
    classes: [CLASS_NAMES_PRACTICE.resultsScreenContainer],
  }).getElement();

  new ParagraphCreator({
    parent: resultsScreenContainer,
    text: "Results Screen",
  }).getElement();

  const libraryButton = new ButtonCreator({
    parent: resultsScreenContainer,
    text: "Go back to Library",
    classes: [CLASS_NAME.button],
  }).getElement();
  libraryButton.dataset.route = RoutePath.Library;

  const resultBlock = new ElementCreator({
    classes: ["result__block"],
    parent: resultsScreenContainer,
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

  return resultsScreenContainer;
}
