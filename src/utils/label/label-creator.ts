import { CreateLabelOptions } from "../../interfaces/create-interfaces/create-label-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class LabelCreator extends ElementCreator {
  constructor(options: CreateLabelOptions) {
    super({ ...options, tag: "label" });
  }

  public getElement(): HTMLLabelElement {
    if (this.element instanceof HTMLLabelElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLLabelElement");
  }
}
