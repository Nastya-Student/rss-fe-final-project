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
import "./landing.page.css";

export class LandingPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("landing-page");

    const wrapper = new ElementCreator({
      parent: this.container,
      classes: ["landing-wrapper"],
    }).getElement();

    const heroSection = new SectionCreator({
      parent: wrapper,
      classes: ["landing-section", "landing-hero"],
    }).getElement();

    const pageTitle = new HeadingsCreator(HEADINGS_ONE, {
      parent: heroSection,
      classes: ["landing-title"],
    }).getElement();
    pageTitle.textContent = "Tandem - widget trainer";

    new ElementCreator({
      text: "Train skills for JS interviews!",
      parent: heroSection,
      classes: ["landing-subtitle"],
    }).getElement();

    const btnWrapper = new ElementCreator({
      parent: heroSection,
      classes: ["landing-btn-wrapper"],
    }).getElement();

    const registerButton = new ButtonCreator({
      text: "Register",
      classes: ["button"],
      parent: btnWrapper,
    }).getElement();
    registerButton.dataset.route = RoutePath.Register;

    const loginButton = new ButtonCreator({
      text: "Login",
      classes: ["button"],
      parent: btnWrapper,
    }).getElement();
    loginButton.dataset.route = RoutePath.Login;

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
      classes: ["landing-section", "landing-cards"],
    }).getElement();

    const cardList = new UnorderedListCreator({
      parent: cardsSection,
      classes: ["landing-widget-cards"],
    }).getElement();

    for (const item of widgetTypes) {
      const cardItem = new ListItemCreator({
        parent: cardList,
        classes: ["landing-widget-card"],
      }).getElement();

      new HeadingsCreator(HEADINGS_THREE, {
        parent: cardItem,
        classes: ["landing-widget-title"],
        text: item.title,
      }).getElement();

      new ElementCreator({
        parent: cardItem,
        classes: ["landing-widget-type"],
        text: item.type,
      }).getElement();

      new ElementCreator({
        parent: cardItem,
        classes: ["landing-widget-description"],
        text: item.description,
      }).getElement();
    }

    const topicsSection = new SectionCreator({
      parent: wrapper,
      classes: ["landing-section", "landing-topics"],
    }).getElement();

    new HeadingsCreator(HEADINGS_TWO, {
      parent: topicsSection,
      classes: ["landing-topics-title"],
      text: "Topics you can profoundly train:",
    }).getElement();

    const topicsArray: string[] = ["Core-JS", "Algorithms", "Typescript"];

    const topicsList = new UnorderedListCreator({
      parent: topicsSection,
      classes: ["landing-topics-list"],
    }).getElement();

    for (const item of topicsArray) {
      new ListItemCreator({
        parent: topicsList,
        classes: ["landing-topics-item"],
        text: item,
      }).getElement();
    }

    const motivationSection = new SectionCreator({
      parent: wrapper,
      classes: ["landing-section", "landing-motivation"],
    }).getElement();

    new HeadingsCreator(HEADINGS_TWO, {
      parent: motivationSection,
      classes: ["motivation-topics-title"],
      text: "Start today and get a Dream Job tomorrow!",
    }).getElement();

    const startButton = new ButtonCreator({
      text: "Begin training!",
      classes: ["button", "button-start"],
      parent: motivationSection,
    }).getElement();
    startButton.dataset.route = RoutePath.Dashboard;
  }
}
