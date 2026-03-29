import { CreateElementOptions } from "../../interfaces/create-interfaces/create-element-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class PreCreator extends ElementCreator {
  constructor(options: CreateElementOptions) {
    super({ ...options, tag: "pre" });
  }

  public getElement(): HTMLElement {
    if (this.element instanceof HTMLPreElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLPreElement");
  }
}
