import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import {
  login,
  loginWithGoogle,
  loginWithGithub,
  getSession,
} from "../../api/auth.service.js";

import "./login.page.style.css";

export class LoginPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("auth-wrapper");

    void getSession()
      .then(({ data }) => {
        if (data.session) {
          window.location.hash = RoutePath.Dashboard;
        }
      })
      .catch(() => {});

    const card = createElement("div", { className: "auth-card" });
    const pageTitle = createElement("h2", { textContent: "Login" });
    const form = createElement("form", { className: "auth-form" });

    const emailInput = createElement("input", {
      attrs: {
        type: "email",
        placeholder: "Email",
        required: true,
        autocomplete: "email",
      },
    });

    const emailError = createElement("p", {
      className: "field-error",
    });

    const emailField = createElement("div", {
      className: "form-field",
    });

    emailField.append(emailInput, emailError);

    const passwordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Password",
        required: true,
        autocomplete: "current-password",
      },
    });

    const togglePasswordBtn = createElement("button", {
      textContent: "Show",
      className: "toggle-password",
      attrs: { type: "button" },
    });

    togglePasswordBtn.addEventListener("click", () => {
      const hidden = passwordInput.type === "password";
      passwordInput.type = hidden ? "text" : "password";
      togglePasswordBtn.textContent = hidden ? "Hide" : "Show";
    });

    const passwordWrapper = createElement("div", {
      className: "password-wrapper",
    });

    passwordWrapper.append(passwordInput, togglePasswordBtn);

    const passwordError = createElement("p", {
      className: "field-error",
    });

    const passwordField = createElement("div", {
      className: "form-field",
    });

    passwordField.append(passwordWrapper, passwordError);

    const submitButton = createElement("button", {
      textContent: "Login",
      attrs: { type: "submit", disabled: true },
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

    const updateSubmitState = () => {
      submitButton.disabled = !emailInput.value.trim() || !passwordInput.value;
    };

    emailInput.addEventListener("input", updateSubmitState);
    passwordInput.addEventListener("input", updateSubmitState);

    const handleOAuthClick = async (providerFn: () => Promise<unknown>) => {
      googleButton.disabled = true;
      githubButton.disabled = true;
      try {
        await providerFn();
      } catch {
        googleButton.disabled = false;
        githubButton.disabled = false;
      }
    };

    googleButton.addEventListener(
      "click",
      () => void handleOAuthClick(loginWithGoogle),
    );

    githubButton.addEventListener(
      "click",
      () => void handleOAuthClick(loginWithGithub),
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      void this.handleSubmit(
        emailInput,
        passwordInput,
        emailError,
        passwordError,
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
      emailField,
      passwordField,
      submitButton,
      divider,
      googleButton,
      githubButton,
    );

    switchBlock.append(registerButton);
    card.append(pageTitle, form, switchBlock);
    this.container.append(card);

    emailInput.focus();
  }

  private async handleSubmit(
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    emailError: HTMLElement,
    passwordError: HTMLElement,
    submitButton: HTMLButtonElement,
  ): Promise<void> {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    emailError.textContent = "";
    passwordError.textContent = "";
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    if (!email) {
      emailError.textContent = "Email is required";
      emailInput.classList.add("input-error");
      return;
    }

    if (!email.includes("@")) {
      emailError.textContent = "Invalid email format";
      emailInput.classList.add("input-error");
      return;
    }

    if (!password) {
      passwordError.textContent = "Password is required";
      passwordInput.classList.add("input-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    try {
      const { error } = await login(email, password);

      if (error) {
        passwordError.textContent = error.message;
        passwordInput.classList.add("input-error");
        passwordInput.value = "";
        passwordInput.focus();
        return;
      }

      window.location.hash = RoutePath.Dashboard;
    } catch {
      passwordError.textContent = "Network error. Please try again.";
      passwordInput.classList.add("input-error");
    } finally {
      submitButton.disabled = !emailInput.value.trim() || !passwordInput.value;
      submitButton.textContent = "Login";
    }
  }
}
