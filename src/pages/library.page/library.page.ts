import { HEADINGS_TWO } from "../../constants.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import { BasePage } from "../base-page.js";
import "./library.page.css";

export class LibraryPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("library-page");

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: this.container,
    }).getElement();
    pageTitle.textContent = "Library Page";

    new ParagraphCreator({
      parent: this.container,
      text: "Choose a topic:",
    });

    const coreJSButton = new ButtonCreator({
      text: "Core JS",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    coreJSButton.dataset.route = "/practice/coreJS";

    const typescriptButton = new ButtonCreator({
      text: "Typescript",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    typescriptButton.dataset.route = "/practice/typescript";

    const algorithmsButton = new ButtonCreator({
      text: "Algorithms",
      classes: ["button"],
      parent: this.container,
    }).getElement();
    algorithmsButton.dataset.route = "/practice/algorithms";
  }
}
