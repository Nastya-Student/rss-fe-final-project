import { Screen } from "../interfaces/screen.interface.js";
import { Page } from "../types/page.type.js";
import FooterCreator from "../utils/footer/footer-creator.js";
import MainCreator from "../utils/main/main-creator.js";
import headerCreator from "../layout/header/header.js";
import { isAuthenticated } from "../api/auth.service";

export default class App {
  private screens = new Map<Page, Screen>();
  private current?: Screen;
  private root: HTMLElement;

  private headerElement?: HTMLElement;
  private main?: HTMLElement;
  private footer?: HTMLElement;

  private protectedRoutes = new Set<Page>(["dashboard", "profile"]);

  constructor(root: HTMLElement) {
    this.root = root;
  }

  init(): void {
    this.headerElement = headerCreator();
    this.main = new MainCreator({
      classes: ["main"],
    }).getElement();
    this.footer = new FooterCreator({ classes: ["footer"] }).getElement();
    this.root.append(this.headerElement);
    this.root.append(this.main);
    this.root.append(this.footer);
  }

  register(page: Page, screen: Screen): void {
    this.screens.set(page, screen);
    if (this.main) {
      screen.create(this.main);
    }
    screen.hide();
  }

  navigate(page: Page, params?: Record<string, string>): void {
    const isProtected = this.protectedRoutes.has(page);

    if (isProtected && !isAuthenticated()) {
      if (window.location.hash !== "#/login") {
        window.location.hash = "#/login";
      }
      return;
    }

    const next = this.screens.get(page);
    if (!next) {
      return;
    }
    this.current?.hide();

    this.current = next;
    next.show(params);
  }
}
