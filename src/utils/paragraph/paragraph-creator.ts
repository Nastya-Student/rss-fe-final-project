import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class ParagraphCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "p" });
  }

  public getElement(): HTMLParagraphElement {
    if (this.element instanceof HTMLParagraphElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLParagraphElement");
  }
}
