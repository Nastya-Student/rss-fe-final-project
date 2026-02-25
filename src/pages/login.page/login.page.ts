import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import { login } from "../../api/auth.service.js";
import { loginWithGoogle, loginWithGithub } from "../../api/auth.service.js";
import { getSession } from "../../api/auth.service.js";

import "./login.page.style.css";

export class LoginPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("auth-wrapper");

    void getSession().then(({ data }) => {
      if (data.session) {
        window.location.hash = RoutePath.Dashboard;
      }
    });

    const card = createElement("div", {
      className: "auth-card",
    });

    const pageTitle = createElement("h2", {
      textContent: "Login",
    });

    const form = createElement("form", {
      className: "auth-form",
    });

    const emailInput = createElement("input", {
      attrs: {
        type: "email",
        placeholder: "Email",
        required: true,
      },
    });

    const passwordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Password",
        required: true,
      },
    });

    const submitButton = createElement("button", {
      textContent: "Login",
      attrs: { type: "submit" },
    });

    const divider = createElement("div", {
      className: "oauth-divider",
      textContent: "or",
    });

    const googleButton = createElement("button", {
      className: "google-btn",
      attrs: { type: "button" },
    });

    googleButton.innerHTML = `
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
      <span>Sign in with Google</span>
    `;

    googleButton.addEventListener("click", () => {
      void loginWithGoogle();
    });

    const githubButton = createElement("button", {
      className: "github-btn",
      attrs: { type: "button" },
    });

    githubButton.innerHTML = `
  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
    -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
    2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
    0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09
    2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16
    1.92.08 2.12.51.56.82 1.27.82 2.15
    0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54
    1.48 0 1.07-.01 1.93-.01 2.2 0
    .21.15.46.55.38A8.013 8.013 0 0016
    8c0-4.42-3.58-8-8-8z"/>
  </svg>
  <span>Sign in with GitHub</span>
`;

    githubButton.addEventListener("click", () => {
      void loginWithGithub();
    });

    const errorMessage = createElement("p", {
      className: "auth-error",
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      void this.handleSubmit(
        emailInput,
        passwordInput,
        errorMessage,
        submitButton,
      );
    });

    const switchBlock = createElement("div", {
      className: "switch-block",
    });

    const registerButton = createElement("button", {
      textContent: "Don't have an account? Register",
      className: "button",
    });

    registerButton.dataset.route = RoutePath.Register;

    form.append(
      emailInput,
      passwordInput,
      submitButton,
      divider,
      googleButton,
      githubButton,
      errorMessage,
    );

    switchBlock.append(registerButton);
    card.append(pageTitle, form, switchBlock);
    this.container.append(card);
  }

  private async handleSubmit(
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    errorMessage: HTMLElement,
    submitButton: HTMLButtonElement,
  ): Promise<void> {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) return;

    submitButton.setAttribute("disabled", "true");
    errorMessage.textContent = "";

    const { error } = await login(email, password);

    submitButton.removeAttribute("disabled");

    if (error) {
      errorMessage.textContent = error.message;
      return;
    }

    window.location.hash = RoutePath.Dashboard;
  }
}
