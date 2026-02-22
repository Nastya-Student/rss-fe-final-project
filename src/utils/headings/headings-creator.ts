import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class HeadingsCreator extends ElementCreator {
  constructor(headingsNumber: number, options: CreateElementOptions) {
    super({ ...options, tag: `h${headingsNumber}` });
  }

  public getElement(): HTMLHeadingElement {
    if (this.element instanceof HTMLHeadingElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLHeadingElement");
  }
}
