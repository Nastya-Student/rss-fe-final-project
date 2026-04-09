import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class ListItemCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "li" });
  }

  public getElement(): HTMLLIElement {
    if (this.element instanceof HTMLLIElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLLIElement");
  }
}
