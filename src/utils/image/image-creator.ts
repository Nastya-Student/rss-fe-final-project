import { CreateImageOptions } from "../../interfaces/create-interfaces/create-image-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class ImageCreator extends ElementCreator {
  constructor(options: CreateImageOptions) {
    super({ ...options, tag: "img" });
    this.setSrc(options.src);
    this.setAlt(options.alt);
  }

  public getElement(): HTMLImageElement {
    if (this.element instanceof HTMLImageElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLImageElement");
  }

  private setSrc(src: string = ""): void {
    if (this.element instanceof HTMLImageElement) {
      this.element.src = src;
    }
  }
  private setAlt(alt: string = ""): void {
    if (this.element instanceof HTMLImageElement) {
      this.element.alt = alt;
    }
  }
}
