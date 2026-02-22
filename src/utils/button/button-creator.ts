import { CreateButtonOptions } from "../../interfaces/create-interfaces/create-button-options.interface.js";
import ElementCreator from "../element-creator.js";
import "./button.css";

export default class ButtonCreator extends ElementCreator {
  constructor(options: CreateButtonOptions) {
    super({ ...options, tag: "button" });
  }

  public getElement(): HTMLButtonElement {
    if (this.element instanceof HTMLButtonElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLButtonElement");
  }
}
