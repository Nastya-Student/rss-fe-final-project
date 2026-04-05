import { Page } from "./page.type.js";

export type RouteMatch = {
  page: Page;
  params?: Record<string, string>;
};
