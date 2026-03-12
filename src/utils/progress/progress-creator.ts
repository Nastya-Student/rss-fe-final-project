import { CreateProgressOptions } from "../../interfaces/create-interfaces/create-progress-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class ProgressCreator extends ElementCreator {
  constructor(options: CreateProgressOptions) {
    super({ ...options, tag: "progress" });
    this.setValue(options.value);
    this.setMax(options.max);
  }

  public getElement(): HTMLProgressElement {
    if (this.element instanceof HTMLProgressElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLProgressElement");
  }

  private setValue(value: number = 0): void {
    if (this.element instanceof HTMLProgressElement) {
      this.element.value = value;
    }
  }

  private setMax(max: number = 0): void {
    if (this.element instanceof HTMLProgressElement) {
      this.element.max = max;
    }
  }
}
