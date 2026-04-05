import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";
import ElementCreator from "../../utils/element-creator.js";
import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator.js";
import ListItemCreator from "../../utils/list-item/list-item-creator.js";
import SectionCreator from "../../utils/section/section-creator.js";
import { HEADINGS_ONE } from "../../constants.js";
import { HEADINGS_TWO } from "../../constants.js";
import { HEADINGS_THREE } from "../../constants.js";
import { CLASS_NAME } from "../../constants.js";
import "./landing.page.css";

export const CLASS_NAMES_LANDING = {
  page: "landing-page",
  wrapper: "landing-wrapper",

  section: "landing-section",
  hero: "landing-hero",
  cards: "landing-cards",
  topics: "landing-topics",
  motivation: "landing-motivation",

  title: "landing-title",
  subtitle: "landing-subtitle",
  widgetTitle: "landing-widget-title",
  topicsTitle: "landing-topics-title",
  motivationTitle: "motivation-topics-title",

  widgetCards: "landing-widget-cards",
  widgetCard: "landing-widget-card",
  widgetType: "landing-widget-type",
  widgetDescription: "landing-widget-description",

  btnWrapper: "landing-btn-wrapper",
  buttonStart: "button-start",

  topicsList: "landing-topics-list",
  topicsItem: "landing-topics-item",
} as const;

export class LandingPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add(CLASS_NAMES_LANDING.page);

    const wrapper = new ElementCreator({
      parent: this.container,
      classes: [CLASS_NAMES_LANDING.wrapper],
    }).getElement();

    const heroSection = new SectionCreator({
      parent: wrapper,
      classes: [CLASS_NAMES_LANDING.section, CLASS_NAMES_LANDING.hero],
    }).getElement();

    const pageTitle = new HeadingsCreator(HEADINGS_ONE, {
      parent: heroSection,
      classes: [CLASS_NAMES_LANDING.title],
    }).getElement();
    pageTitle.textContent = "Tandem - widget trainer";

    new ElementCreator({
      text: "Train skills for JS interviews!",
      parent: heroSection,
      classes: [CLASS_NAMES_LANDING.subtitle],
    }).getElement();

    const btnWrapperFirst = new ElementCreator({
      parent: heroSection,
      classes: [CLASS_NAMES_LANDING.btnWrapper],
    }).getElement();

    const startButtonFirst = new ButtonCreator({
      text: "Begin training!",
      classes: [CLASS_NAME.button, CLASS_NAMES_LANDING.buttonStart],
      parent: btnWrapperFirst,
    }).getElement();
    startButtonFirst.dataset.route = RoutePath.Dashboard;

    const widgetTypes = [
      {
        title: "Quiz",
        type: "Multiple Choice",
        description:
          "Test your knowledge with interactive multiple-choice quizzes",
      },
      {
        title: "True / False",
        type: "Binary Choice",
        description:
          "Quick statements to verify — decide if each statement is true or false",
      },
      {
        title: "Code Completion",
        type: "Fill in Blanks",
        description: "Complete the code snippets by filling in missing parts",
      },
      {
        title: "Code Ordering",
        type: "Drag & Drop",
        description:
          "Arrange code lines in the correct order using drag-and-drop",
      },
      {
        title: "Async Sorter",
        type: "Event Loop Game",
        description:
          "Place code blocks into Call Stack, Microtasks, and Macrotasks queues",
      },
      {
        title: "Memory Game",
        type: "Garbage Collector",
        description:
          "Click on objects that become garbage after code execution",
      },
      {
        title: "Stack Builder",
        type: "Call Stack Game",
        description:
          "Build the call stack by dragging function blocks in correct order",
      },
    ];

    const cardsSection = new SectionCreator({
      parent: wrapper,
      classes: [CLASS_NAMES_LANDING.section, CLASS_NAMES_LANDING.cards],
    }).getElement();

    const cardList = new UnorderedListCreator({
      parent: cardsSection,
      classes: [CLASS_NAMES_LANDING.widgetCards],
    }).getElement();

    for (const item of widgetTypes) {
      const cardItem = new ListItemCreator({
        parent: cardList,
        classes: [CLASS_NAMES_LANDING.widgetCard],
      }).getElement();

      new HeadingsCreator(HEADINGS_THREE, {
        parent: cardItem,
        classes: [CLASS_NAMES_LANDING.widgetTitle],
        text: item.title,
      }).getElement();

      new ElementCreator({
        parent: cardItem,
        classes: [CLASS_NAMES_LANDING.widgetType],
        text: item.type,
      }).getElement();

      new ElementCreator({
        parent: cardItem,
        classes: [CLASS_NAMES_LANDING.widgetDescription],
        text: item.description,
      }).getElement();
    }

    const topicsSection = new SectionCreator({
      parent: wrapper,
      classes: [CLASS_NAMES_LANDING.section, CLASS_NAMES_LANDING.topics],
    }).getElement();

    new HeadingsCreator(HEADINGS_TWO, {
      parent: topicsSection,
      classes: [CLASS_NAMES_LANDING.topicsTitle],
      text: "Topics you can profoundly train:",
    }).getElement();

    const topicsArray: string[] = ["Core-JS", "Algorithms", "Typescript"];

    const topicsList = new UnorderedListCreator({
      parent: topicsSection,
      classes: [CLASS_NAMES_LANDING.topicsList],
    }).getElement();

    for (const item of topicsArray) {
      new ListItemCreator({
        parent: topicsList,
        classes: [CLASS_NAMES_LANDING.topicsItem],
        text: item,
      }).getElement();
    }

    const motivationSection = new SectionCreator({
      parent: wrapper,
      classes: [CLASS_NAMES_LANDING.section, CLASS_NAMES_LANDING.motivation],
    }).getElement();

    new HeadingsCreator(HEADINGS_TWO, {
      parent: motivationSection,
      classes: [CLASS_NAMES_LANDING.motivationTitle],
      text: "Start today and get a Dream Job tomorrow!",
    }).getElement();

    const btnWrapper = new ElementCreator({
      parent: motivationSection,
      classes: [CLASS_NAMES_LANDING.btnWrapper],
    }).getElement();

    const startButton = new ButtonCreator({
      text: "Begin training!",
      classes: [CLASS_NAME.button, CLASS_NAMES_LANDING.buttonStart],
      parent: btnWrapper,
    }).getElement();
    startButton.dataset.route = RoutePath.Dashboard;
  }
}
