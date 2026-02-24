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

    const pageTitle = new HeadingsCreator(1, {
      parent: Wrapper,
      classes: ["title"],
    }).getElement();
    pageTitle.textContent = "Tandem - widget trainer";

    new ElementCreator({
      text: "Train skills for JS interviews!",
      parent: Wrapper,
      classes: ["subtitle"],
    }).getElement();
    //pageSubTitle.style.alignItems = "self"; // for linter

    const BtnWrapper = new ElementCreator({
      parent: Wrapper,
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

    // const startButton = new ButtonCreator({
    //   text: "Start",
    //   classes: ["button"],
    //   parent: BtnWrapper,
    // }).getElement();
    // loginButton.dataset.route = RoutePath.Dashboard;

    //const ThemesArray: string[] = ["Core-js", "Algorithms", "Typescript"];
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

    const CardList = new UnorderedListCreator({
      parent: Wrapper,
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
      //TitleItem.style.alignItems = "self"; // for linter

      new ElementCreator({
        parent: CardItem,
        classes: ["widget-type"],
        text: item.type,
      }).getElement();
      //TypeItem.style.alignItems = "self"; // for linter

      new ElementCreator({
        parent: CardItem,
        classes: ["widget-description"],
        text: item.description,
      }).getElement();
      //DescriptionItem.style.alignItems = "self"; // for linter
    }
  }
}
