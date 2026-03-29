import { CreateSVGElementOptions } from "../../../interfaces/create-interfaces/create-svg-element-options.interface";
import SVGElementCreator from "../../svg-element-creator";

export class SVGGCreator extends SVGElementCreator {
  constructor(options: CreateSVGElementOptions) {
    super({ ...options, tag: "g" });
  }

  public getElement(): SVGGElement {
    if (this.element instanceof SVGGElement) {
      return this.element;
    }
    throw new Error("Element is not SVGGElement");
  }
}
