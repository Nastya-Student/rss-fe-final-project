import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class NavigationCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "nav" });
  }

  public getElement(): HTMLElement {
    if (this.element instanceof HTMLElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLElement");
  }
}
