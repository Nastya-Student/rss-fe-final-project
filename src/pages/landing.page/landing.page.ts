import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";
import ElementCreator from "../../utils/element-creator.js";
import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator.js";
import ListItemCreator from "../../utils/list-item/list-item-creator.js";
import "./landing.page.css";

export class LandingPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("landing-page");

    const Wrapper = new ElementCreator({
      parent: this.container,
      classes: ["landing-wrapper"],
    }).getElement();

    const HeroSection = new ElementCreator({
      tag: "section",
      parent: Wrapper,
      classes: ["landing-section", "landing-hero"],
    }).getElement();

    const pageTitle = new HeadingsCreator(1, {
      parent: HeroSection,
      classes: ["title"],
    }).getElement();
    pageTitle.textContent = "Tandem - widget trainer";

    new ElementCreator({
      text: "Train skills for JS interviews!",
      parent: HeroSection,
      classes: ["subtitle"],
    }).getElement();

    const BtnWrapper = new ElementCreator({
      parent: HeroSection,
      classes: ["btn-wrapper"],
    }).getElement();

    const registerButton = new ButtonCreator({
      text: "Register",
      classes: ["button"],
      parent: BtnWrapper,
    }).getElement();
    registerButton.dataset.route = RoutePath.Register;

    const loginButton = new ButtonCreator({
      text: "Login",
      classes: ["button"],
      parent: BtnWrapper,
    }).getElement();
    loginButton.dataset.route = RoutePath.Login;

    const widgetTypes = [
      {
        title: "Quiz",
        type: "Multiple Choice",
        description:
          "Test your knowledge with interactive quizzes — choose correct answers from multiple options",
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

    const CardsSection = new ElementCreator({
      tag: "section",
      parent: Wrapper,
      classes: ["landing-section", "landing-cards"],
    }).getElement();

    const CardList = new UnorderedListCreator({
      parent: CardsSection,
      classes: ["widget-cards"],
    }).getElement();

    for (const item of widgetTypes) {
      const CardItem = new ListItemCreator({
        parent: CardList,
        classes: ["widget-card"],
      }).getElement();

      new HeadingsCreator(3, {
        parent: CardItem,
        classes: ["widget-title"],
        text: item.title,
      }).getElement();

      new ElementCreator({
        parent: CardItem,
        classes: ["widget-type"],
        text: item.type,
      }).getElement();

      new ElementCreator({
        parent: CardItem,
        classes: ["widget-description"],
        text: item.description,
      }).getElement();
    }

    const TopicsSection = new ElementCreator({
      tag: "section",
      parent: Wrapper,
      classes: ["landing-section", "landing-topics"],
    }).getElement();

    new HeadingsCreator(2, {
      parent: TopicsSection,
      classes: ["landing-topics-title"],
      text: "Topics you can profoundly train:",
    }).getElement();

    const topicsArray: string[] = ["Core-JS", "Algorithms", "Typescript"];

    const TopicsList = new UnorderedListCreator({
      parent: TopicsSection,
      classes: ["landing-topics-list"],
    }).getElement();

    for (const item of topicsArray) {
      new ListItemCreator({
        parent: TopicsList,
        classes: ["landing-topics-item"],
        text: item,
      }).getElement();
    }

    const MotivationSection = new ElementCreator({
      tag: "section",
      parent: Wrapper,
      classes: ["landing-section", "landing-motivation"],
    }).getElement();

    new HeadingsCreator(2, {
      parent: MotivationSection,
      classes: ["motivation-topics-title"],
      text: "Start today and get a Dream Job tomorrow!",
    }).getElement();

    const startButton = new ButtonCreator({
      text: "Begin training!",
      classes: ["button", "button-start"],
      parent: MotivationSection,
    }).getElement();
    startButton.dataset.route = RoutePath.Dashboard;
  }
}
