import { Screen } from "../interfaces/screen.interface.js";

export abstract class BasePage implements Screen {
  protected container = document.createElement("div");

  abstract create(parent: HTMLElement): void;

  show(): void {
    this.container.style.display = "flex";
  }

  hide(): void {
    this.container.style.display = "none";
  }
}
