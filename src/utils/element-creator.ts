import { CreateElementOptions } from "../interfaces/create-interfaces/create-element-options.interface.js";

export default class ElementCreator {
  public element: HTMLElement;

  constructor(options: CreateElementOptions) {
    this.element = document.createElement(options.tag ?? "div");
    this.createElement(options);
  }

  public createElement(options: CreateElementOptions): void {
    this.setTextContent(options.text);
    this.addCSSClasses(options.classes);
    this.setHidden(options.hidden);
    if (options.parent instanceof HTMLElement) {
      this.appendElement(options.parent);
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private setTextContent(text: string = ""): void {
    this.element.textContent = text;
  }

  private addCSSClasses(cssClasses: string[] = []): void {
    this.element.classList.add(...cssClasses);
  }

  private setHidden(hidden: boolean = false): void {
    this.element.hidden = hidden;
  }

  private appendElement(parent: HTMLElement): void {
    parent.append(this.element);
  }
}
