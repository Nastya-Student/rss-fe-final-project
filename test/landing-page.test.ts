/**
 * @vitest-environment happy-dom
 */

import { describe, beforeEach } from "vitest";
import { LandingPage } from "../src/pages/landing.page/landing.page.js";

describe("Landing Tests", () => {
  let landing: LandingPage;
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement("div");
    landing = new LandingPage();
    landing.create(container);
  });
});
