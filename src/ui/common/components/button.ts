import { CreateButtonOptions } from "../../../types/elements.js";
import ElementCreator from "./base-component.js";
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