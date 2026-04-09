import { CreateSVGElementOptions } from "../../../interfaces/create-interfaces/create-svg-element-options.interface.js";
import SVGElementCreator from "../../svg-element-creator.js";

export class SVGSVGCreator extends SVGElementCreator {
  constructor(options: CreateSVGElementOptions) {
    super({ ...options, tag: "svg" });
  }

  public getElement(): SVGSVGElement {
    if (this.element instanceof SVGSVGElement) {
      return this.element;
    }
    throw new Error("Element is not SVGSVGElement");
  }
}
