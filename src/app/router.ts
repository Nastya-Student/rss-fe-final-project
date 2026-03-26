import { EVENT } from "../constants.js";
import { Page } from "../types/page.type.js";
import { RouteMatch } from "../types/route-match.type.js";
import { RoutePath } from "../types/route-path.enum.js";
import App from "./app.js";

const staticRoutes: Record<string, Page> = {
  [RoutePath.Landing]: "landing",
  [RoutePath.Login]: "login",
  [RoutePath.Register]: "register",
  [RoutePath.Dashboard]: "dashboard",
  [RoutePath.Library]: "library",
  [RoutePath.Profile]: "profile",
  [RoutePath.ForgotPassword]: "forgot-password",
  [RoutePath.UpdatePassword]: "update-password",
};

export class Router {
  constructor(private app: App) {}

  init(): void {
    document.addEventListener(EVENT.click, (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const route = target.dataset.route;

      if (route !== undefined) {
        event.preventDefault();
        this.go(route);
      }
    });

    window.addEventListener(EVENT.hashchange, () => {
      this.resolve();
    });

    this.resolve();
  }

  private go(path: string): void {
    window.location.hash = path;
  }

  private resolve(): void {
    const hash = window.location.hash;
    const raw = hash ? hash.slice(1) : RoutePath.Landing;

    const path = raw.split("#")[0] ?? RoutePath.Landing;

    if (raw.includes("access_token")) {
      window.location.hash = path;
      return;
    }

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
