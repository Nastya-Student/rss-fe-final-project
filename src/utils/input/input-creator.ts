import ElementCreator from "../element-creator.js";
import { CreateInputOptions } from "../../interfaces/create-interfaces/create-input-options.interface.js";

export default class InputCreator extends ElementCreator {
  constructor(options: CreateInputOptions) {
    super({ ...options, tag: "input" });
    this.setPlaceholder(options.placeholder);
  }

  public getElement(): HTMLInputElement {
    if (this.element instanceof HTMLInputElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLInputElement");
  }

  private setPlaceholder(placeholder: string = ""): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.placeholder = placeholder;
    }
  }
}
