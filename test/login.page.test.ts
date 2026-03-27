// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "../src/pages/login.page/login.page.js";
import { RoutePath } from "../src/types/route-path.enum.js";
import { login } from "../src/api/auth.service.js";

vi.mock("../src/api/auth.service.js", () => ({
  login: vi.fn(),
  loginWithGoogle: vi.fn(),
  loginWithGithub: vi.fn(),
  getSession: vi.fn().mockResolvedValue({
    data: {
      user: undefined,
      session: undefined,
    },
    error: undefined,
  }),
}));

function getElement<T extends Element>(selector: string): T {
  const el = document.querySelector(selector);

  if (!el) {
    throw new Error(`Element not found: ${selector}`);
  }

  return el as T;
}

function mockLoginSuccess(): Awaited<ReturnType<typeof login>> {
  return {
    data: {
      user: undefined,
      session: undefined,
    },
    error: undefined,
  } as Awaited<ReturnType<typeof login>>;
}

describe("LoginPage", () => {
  let root: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = "";

    root = document.createElement("div");
    document.body.append(root);

    const page = new LoginPage();
    page.create(root);
  });

  it("renders login form", () => {
    const form = document.querySelector("form");

    expect(form).toBeTruthy();

    const email = document.querySelector('input[type="email"]');
    const password = document.querySelector('input[type="password"]');

    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it("calls login API on submit", async () => {
    vi.mocked(login).mockResolvedValue(mockLoginSuccess());

    const email = getElement<HTMLInputElement>('input[type="email"]');
    const password = getElement<HTMLInputElement>('input[type="password"]');
    const form = getElement<HTMLFormElement>("form");

    email.value = "test@mail.com";
    password.value = "123456";

    form.dispatchEvent(new Event("submit"));

    await Promise.resolve();

    expect(login).toHaveBeenCalledWith("test@mail.com", "123456");
  });

  it("redirects to dashboard on success", async () => {
    vi.mocked(login).mockResolvedValue(mockLoginSuccess());

    const email = getElement<HTMLInputElement>('input[type="email"]');
    const password = getElement<HTMLInputElement>('input[type="password"]');
    const form = getElement<HTMLFormElement>("form");

    email.value = "test@mail.com";
    password.value = "123456";

    form.dispatchEvent(new Event("submit"));

    await Promise.resolve();

    expect(window.location.hash).toBe(`#${RoutePath.Dashboard}`);
  });

  it("toggles password visibility", () => {
    const password = getElement<HTMLInputElement>('input[type="password"]');
    const toggle = getElement<HTMLButtonElement>(".auth-toggle-password");

    expect(password.type).toBe("password");

    toggle.click();

    expect(password.type).toBe("text");

    toggle.click();

    expect(password.type).toBe("password");
  });

  it("submit button is disabled when inputs are empty", () => {
    const submit = getElement<HTMLButtonElement>('button[type="submit"]');

    expect(submit.disabled).toBe(true);
  });
});
