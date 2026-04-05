import { CreateTextAreaOptions } from "../../interfaces/create-interfaces/create-text-area-options.interface.js";
import ElementCreator from "../element-creator.js";
import "./text-area.css";

export default class TextAreaCreator extends ElementCreator {
  constructor(options: CreateTextAreaOptions) {
    super({ ...options, tag: "textarea" });
    this.setPlaceholder(options.placeholder);
  }

  public getElement(): HTMLTextAreaElement {
    if (this.element instanceof HTMLTextAreaElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLTextAreaElement");
  }

  private setPlaceholder(placeholder: string = ""): void {
    if (this.element instanceof HTMLTextAreaElement) {
      this.element.placeholder = placeholder;
    }
  }
}
