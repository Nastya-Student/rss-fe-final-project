import { CreateSVGElementOptions } from "../interfaces/create-interfaces/create-svg-element-options.interface";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

export default class SVGElementCreator {
  public element: SVGElement;

  constructor(options: CreateSVGElementOptions) {
    this.element = document.createElementNS(
      SVG_NAMESPACE,
      options.tag ?? "svg",
    );
    this.createElement(options);
  }

  public createElement(options: CreateSVGElementOptions): void {
    this.setTextContent(options.text);
    this.addCSSClasses(options.classes);
    this.setAttributes(options.attributes);

    if (options.parent instanceof SVGElement) {
      this.appendElement(options.parent);
    }
  }

  public getElement(): SVGElement {
    return this.element;
  }

  private setTextContent(text: string = ""): void {
    this.element.textContent = text;
  }

  private addCSSClasses(cssClasses: string[] = []): void {
    this.element.classList.add(...cssClasses);
  }

  private appendElement(parent: SVGElement): void {
    parent.append(this.element);
  }

  private setAttributes(attributes: Record<string, string> = {}): void {
    for (const key of Object.keys(attributes)) {
      this.element.setAttribute(key, String(attributes[key]));
    }
  }
}
