import { Screen } from "../interfaces/screen.interface.js";
import { Page } from "../types/page.type.js";
import MainCreator from "../utils/main/main-creator.js";
import headerCreator from "../layout/header/header.js";
import footerCreator from "../layout/footer/footer.js";
import {
  createLocalUser,
  createPracticeHistory,
  createProgress,
} from "../local-storage/create-local-data.js";

const DEFAULT_USER_ID = "u1";

export default class App {
  private screens = new Map<Page, Screen>();
  private current?: Screen;
  private root: HTMLElement;

  private headerElement?: HTMLElement;
  private main?: HTMLElement;
  private footerElement?: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  async createUser(): Promise<void> {
    await createLocalUser(DEFAULT_USER_ID);
    await createPracticeHistory(DEFAULT_USER_ID);
    await createProgress(DEFAULT_USER_ID);
  }

  init(): void {
    this.headerElement = headerCreator();
    this.main = new MainCreator({
      classes: ["main"],
    }).getElement();
    this.footerElement = footerCreator();
    this.root.append(this.headerElement);
    this.root.append(this.main);
    this.root.append(this.footerElement);
  }

  register(page: Page, screen: Screen): void {
    this.screens.set(page, screen);
    if (this.main) {
      screen.create(this.main);
    }
    screen.hide();
  }

  navigate(page: Page, params?: Record<string, string>): void {
    const next = this.screens.get(page);
    if (!next) {
      return;
    }
    this.current?.hide();

    this.current = next;
    next.show(params);
  }
}
