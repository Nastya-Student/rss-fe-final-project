import { CreateAnchorOptions } from "../../interfaces/create-interfaces/create-anchor-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class AnchorCreator extends ElementCreator {
  constructor(options: CreateAnchorOptions) {
    super({ ...options, tag: "a" });
    this.setHref(options.href);
    this.setTarget(options.target);
  }

  public getElement(): HTMLAnchorElement {
    if (this.element instanceof HTMLAnchorElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLAnchorElement");
  }

  private setHref(href: string): void {
    if (this.element instanceof HTMLAnchorElement) {
      this.element.href = href;
    }
  }

  private setTarget(target: string): void {
    if (this.element instanceof HTMLAnchorElement) {
      this.element.target = target;
    }
  }
}
