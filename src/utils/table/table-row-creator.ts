import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class TableRowCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "tr" });
  }

  public getElement(): HTMLTableRowElement {
    if (this.element instanceof HTMLTableRowElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLTableRowElement");
  }
}
