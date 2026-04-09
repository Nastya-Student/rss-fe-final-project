import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class FooterCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "footer" });
  }

  public getElement(): HTMLElement {
    if (this.element instanceof HTMLElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLElement");
  }
}
