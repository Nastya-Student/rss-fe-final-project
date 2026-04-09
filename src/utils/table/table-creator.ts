import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class TableCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "table" });
  }

  public getElement(): HTMLTableElement {
    if (this.element instanceof HTMLTableElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLTableElement");
  }
}
