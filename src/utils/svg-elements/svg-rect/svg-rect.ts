import { CreateSVGElementOptions } from "../../../interfaces/create-interfaces/create-svg-element-options.interface.js";
import SVGElementCreator from "../../svg-element-creator.js";

export class SVGRectCreator extends SVGElementCreator {
  constructor(options: CreateSVGElementOptions) {
    super({ ...options, tag: "rect" });
  }

  public getElement(): SVGRectElement {
    if (this.element instanceof SVGRectElement) {
      return this.element;
    }
    throw new Error("Element is not SVGRectElement");
  }
}
