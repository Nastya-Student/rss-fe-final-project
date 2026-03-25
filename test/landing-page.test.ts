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

  it("render all theme items", () => {
    const themes = container.querySelectorAll(".landing-topics-item");
    expect(themes.length).toBe(3);
  });

  it("found min 3 mandatory sections", () => {
    const sections = container.querySelectorAll(".landing-section");
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });

  it("contain only one header one", () => {
    const titles = container.querySelectorAll("h1");
    expect(titles.length).toBe(1);
  });

  it("card contain title, type, descr", () => {
    const cards = container.querySelectorAll(".landing-widget-card");
    for (const card of cards) {
      const title = card.querySelector(".landing-widget-title");
      const type = card.querySelector(".landing-widget-type");
      const descr = card.querySelector(".landing-widget-description");
      expect(title).toBeTruthy();
      expect(type).toBeTruthy();
      expect(descr).toBeTruthy();
    }
  });
});
