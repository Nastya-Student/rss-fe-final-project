import { CreateSVGElementOptions } from "../../../interfaces/create-interfaces/create-svg-element-options.interface";
import SVGElementCreator from "../../svg-element-creator";

export class SVGTextCreator extends SVGElementCreator {
  constructor(options: CreateSVGElementOptions) {
    super({ ...options, tag: "text" });
  }

  public getElement(): SVGTextElement {
    if (this.element instanceof SVGTextElement) {
      return this.element;
    }
    throw new Error("Element is not SVGTextElement");
  }
}
