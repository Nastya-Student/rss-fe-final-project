import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class UnorderedListCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "ul" });
  }

  public getElement(): HTMLUListElement {
    if (this.element instanceof HTMLUListElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLUListElement");
  }
}
