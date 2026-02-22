import { Page } from "../types/page.type.js";
import { RouteMatch } from "../types/route-match.type.js";
import App from "./app.js";

const staticRoutes: Record<string, Page> = {
  "/": "landing",
  "/login": "login",
  "/register": "register",
  "/dashboard": "dashboard",
  "/library": "library",
  "/profile": "profile",
};

export class Router {
  constructor(private app: App) {}

  init(): void {
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) return;

      const route = target.dataset.route;

      if (route !== undefined) {
        event.preventDefault();
        this.go(route);
      }
    });

    window.addEventListener("hashchange", () => {
      this.resolve();
    });

    this.resolve();
  }

  private go(path: string): void {
    window.location.hash = path;
  }

  private resolve(): void {
    const hash = window.location.hash;
    const path = hash ? hash.slice(1) : "/";

    const match = this.matchRoute(path);

    if (!match) {
      this.app.navigate("404");
      return;
    }

    this.app.navigate(match.page, match.params);
  }

  private matchRoute(path: string): RouteMatch | undefined {
    if (staticRoutes[path]) {
      return { page: staticRoutes[path] };
    }
    const practiceMatch = path.match(/^\/practice\/([^/]+)$/);

    if (practiceMatch) {
      const topicId = practiceMatch[1];

      if (topicId !== undefined) {
        return {
          page: "practice",
          params: { topicId },
        };
      }
    }

    return;
  }
}
