import { CreateSVGElementOptions } from "../../../interfaces/create-interfaces/create-svg-element-options.interface.js";
import SVGElementCreator from "../../svg-element-creator.js";

export class SVGLineCreator extends SVGElementCreator {
  constructor(options: CreateSVGElementOptions) {
    super({ ...options, tag: "line" });
  }

  public getElement(): SVGLineElement {
    if (this.element instanceof SVGLineElement) {
      return this.element;
    }
    throw new Error("Element is not SVGLineElement");
  }
}
