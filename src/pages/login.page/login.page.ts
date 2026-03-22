import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import {
  login,
  loginWithGoogle,
  loginWithGithub,
  getSession,
} from "../../api/auth.service.js";
import type { OAuthResponse } from "@supabase/supabase-js";

import "./login.page.style.css";
import githubIcon from "../../assets/svg/github.svg";
import googleIcon from "../../assets/svg/google.svg";

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
      className: "auth-field-error",
    });

    const emailField = createElement("div", {
      className: "auth-form-field",
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
      className: "auth-toggle-password",
      attrs: { type: "button" },
    });

    togglePasswordBtn.addEventListener("click", (): void => {
      const hidden = passwordInput.type === "password";
      passwordInput.type = hidden ? "text" : "password";
      togglePasswordBtn.textContent = hidden ? "Hide" : "Show";
    });

    const passwordWrapper = createElement("div", {
      className: "auth-password-wrapper",
    });

    passwordWrapper.append(passwordInput, togglePasswordBtn);

    const passwordError = createElement("p", {
      className: "auth-field-error",
    });

    const passwordField = createElement("div", {
      className: "auth-form-field",
    });

    passwordField.append(passwordWrapper, passwordError);

    const submitButton = createElement("button", {
      textContent: "Login",
      attrs: { type: "submit", disabled: true },
    });

    const divider = createElement("div", {
      className: "auth-oauth-divider",
      textContent: "or",
    });

    const googleButton = createElement("button", {
      className: "auth-google-btn",
      attrs: { type: "button" },
    });

    googleButton.append(
      createElement("img", { attrs: { src: googleIcon, alt: "Google" } }),
      createElement("span", { textContent: "Sign in with Google" }),
    );

    const githubButton = createElement("button", {
      className: "auth-github-btn",
      attrs: { type: "button" },
    });

    githubButton.append(
      createElement("img", { attrs: { src: githubIcon, alt: "GitHub" } }),
      createElement("span", { textContent: "Sign in with GitHub" }),
    );

    const updateSubmitState = (): void => {
      submitButton.disabled = !emailInput.value.trim() || !passwordInput.value;
    };

    emailInput.addEventListener("input", updateSubmitState);
    passwordInput.addEventListener("input", updateSubmitState);

    const handleOAuthClick = async (
      providerFn: () => Promise<OAuthResponse>,
    ): Promise<void> => {
      googleButton.disabled = true;
      githubButton.disabled = true;

      try {
        const { error } = await providerFn();

        if (error) {
          googleButton.disabled = false;
          githubButton.disabled = false;
        }
      } catch {
        googleButton.disabled = false;
        githubButton.disabled = false;
      }
    };

    googleButton.addEventListener("click", (): void => {
      void handleOAuthClick(loginWithGoogle);
    });

    githubButton.addEventListener("click", (): void => {
      void handleOAuthClick(loginWithGithub);
    });

    form.addEventListener("submit", (e: SubmitEvent): void => {
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
      className: "auth-switch-block",
    });

    const registerButton = createElement("button", {
      textContent: "Don't have an account? Register",
      className: "auth-button",
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
    emailInput.classList.remove("auth-input-error");
    passwordInput.classList.remove("auth-input-error");

    if (!email) {
      emailError.textContent = "Email is required";
      emailInput.classList.add("auth-input-error");
      return;
    }

    if (!email.includes("@")) {
      emailError.textContent = "Invalid email format";
      emailInput.classList.add("auth-input-error");
      return;
    }

    if (!password) {
      passwordError.textContent = "Password is required";
      passwordInput.classList.add("auth-input-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    try {
      const { error } = await login(email, password);

      if (error) {
        passwordError.textContent = error.message;
        passwordInput.classList.add("auth-input-error");
        passwordInput.value = "";
        passwordInput.focus();
        return;
      }

      window.location.hash = RoutePath.Dashboard;
    } catch {
      passwordError.textContent = "Network error. Please try again.";
      passwordInput.classList.add("auth-input-error");
    } finally {
      submitButton.disabled = !emailInput.value.trim() || !passwordInput.value;
      submitButton.textContent = "Login";
    }
  }
}
