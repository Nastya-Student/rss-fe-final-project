import { CLASS_NAME, HEADINGS_ONE, HEADINGS_TWO } from "../../../constants.js";
import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import { getSession } from "../../../local-storage/current-session.js";
import { CLASS_NAMES_PRACTICE } from "../../../pages/practice.page/practice.page.js";
import { RoutePath } from "../../../types/route-path.enum.js";
import { Widget } from "../../../types/widget.type.js";
import ButtonCreator from "../../../utils/button/button-creator.js";
import ElementCreator from "../../../utils/element-creator.js";
import HeadingsCreator from "../../../utils/headings/headings-creator.js";
import ListItemCreator from "../../../utils/list-item/list-item-creator.js";
import UnorderedListCreator from "../../../utils/unordered-list/unordered-list-creator.js";
import "./results-screen.component.css";

export default function resultsScreenComponent(
  widgets: Widget[],
  practiceSession?: PracticeSession,
): HTMLElement {
  const session = practiceSession ?? getSession();
  if (session === undefined) {
    throw new Error("please, create a local session first");
  }

  const resultsScreenContainer = new ElementCreator({
    classes: [CLASS_NAMES_PRACTICE.resultsScreenContainer],
  }).getElement();

  const header = new ElementCreator({
    classes: ["practice__header"],
    parent: resultsScreenContainer,
  }).getElement();

  new ButtonCreator({
    parent: header,
  });

  new HeadingsCreator(HEADINGS_ONE, {
    text: "Awesome Results:",
    classes: ["practice__title"],
    parent: header,
  });

  const libraryButton = new ButtonCreator({
    text: "Go back to Library",
    classes: [CLASS_NAME.button],
    parent: header,
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
      continue;
    }
    const question = widget.payload.title;
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
      classes: [
        "result__answer",
        answer ? "result__correct-answer" : "result__incorrect-answer",
      ],
      parent: answersItem,
    }).getElement();
  }

  return resultsScreenContainer;
}
