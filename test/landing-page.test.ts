/**
 * @vitest-environment happy-dom
 */

import { describe, beforeEach, it, expect } from "vitest";
import { LandingPage } from "../src/pages/landing.page/landing.page.js";

describe("Landing Tests", () => {
  let landing: LandingPage;
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement("div");
    landing = new LandingPage();
    landing.create(container);
  });

  it("render all cards", () => {
    const cards = container.querySelectorAll(".landing-widget-card");
    expect(cards.length).toBe(7);
  });
});
