import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import {
  login,
  loginWithGoogle,
  loginWithGithub,
} from "../../api/auth.service.js";

import "./login.page.style.css";
import githubIcon from "../../assets/svg/github.svg";
import googleIcon from "../../assets/svg/google.svg";

export class LoginPage extends BasePage {
  private getErrorMessage(error: unknown, fallback: string): string {
    if (typeof error === "object" && error !== null && "message" in error) {
      const msg = (error as { message?: unknown }).message;

      if (typeof msg === "string") {
        return msg;
      }
    }

    return fallback;
  }

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("auth-wrapper");

    const card = createElement("div", { className: "auth-card" });
    const pageTitle = createElement("h2", { textContent: "Login" });
    const form = createElement("form", { className: "auth-form" });

    const formError = createElement("p", {
      className: "auth-form-error",
    });

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

    const forgotPasswordBtn = createElement("button", {
      textContent: "Forgot password?",
      className: "auth-forgot-password",
      attrs: { type: "button" },
    });

    forgotPasswordBtn.addEventListener("click", (): void => {
      window.location.hash = RoutePath.ForgotPassword;
    });

    passwordField.append(passwordWrapper, passwordError, forgotPasswordBtn);

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
      const hasEmail = emailInput.value.trim().length > 0;
      const hasPassword = passwordInput.value.length > 0;
      submitButton.disabled = !(hasEmail && hasPassword);
    };

    const validateEmail = (): boolean => {
      const email = emailInput.value.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      emailError.textContent = "";
      emailInput.classList.remove("auth-input-error");

      if (email.length === 0) {
        emailError.textContent = "Email is required";
        emailInput.classList.add("auth-input-error");
        return false;
      }

      if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email format";
        emailInput.classList.add("auth-input-error");
        return false;
      }

      return true;
    };

    const validatePassword = (): boolean => {
      passwordError.textContent = "";
      passwordInput.classList.remove("auth-input-error");

      if (passwordInput.value.length === 0) {
        passwordError.textContent = "Password is required";
        passwordInput.classList.add("auth-input-error");
        return false;
      }

      return true;
    };

    emailInput.addEventListener("input", updateSubmitState);
    passwordInput.addEventListener("input", updateSubmitState);
    emailInput.addEventListener("blur", validateEmail);
    passwordInput.addEventListener("blur", validatePassword);

    const handleOAuthClick = async (
      providerFn: () => Promise<{ error: unknown }>,
      button: HTMLButtonElement,
    ): Promise<void> => {
      googleButton.disabled = true;
      githubButton.disabled = true;
      formError.textContent = "";

      const originalText = button.textContent;
      button.textContent = "Loading...";

      try {
        const { error } = await providerFn();

        if (error !== null && error !== undefined) {
          formError.textContent = this.getErrorMessage(error, "OAuth error");
        }
      } catch {
        formError.textContent = "OAuth failed";
      } finally {
        googleButton.disabled = false;
        githubButton.disabled = false;
        button.textContent = originalText ?? "";
      }
    };

    googleButton.addEventListener("click", (): void => {
      void handleOAuthClick(loginWithGoogle, googleButton);
    });

    githubButton.addEventListener("click", (): void => {
      void handleOAuthClick(loginWithGithub, githubButton);
    });

    form.addEventListener("submit", (e: SubmitEvent): void => {
      e.preventDefault();

      void this.handleSubmit(
        emailInput,
        passwordInput,
        emailError,
        passwordError,
        submitButton,
        formError,
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
      formError,
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
    formError: HTMLElement,
  ): Promise<void> {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    emailError.textContent = "";
    passwordError.textContent = "";
    formError.textContent = "";

    emailInput.classList.remove("auth-input-error");
    passwordInput.classList.remove("auth-input-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
      emailError.textContent = "Email is required";
      emailInput.classList.add("auth-input-error");
      return;
    }

    if (!emailRegex.test(email)) {
      emailError.textContent = "Invalid email format";
      emailInput.classList.add("auth-input-error");
      return;
    }

    if (password.length === 0) {
      passwordError.textContent = "Password is required";
      passwordInput.classList.add("auth-input-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    try {
      const { error } = await login(email, password);

      if (error !== null && error !== undefined) {
        const message = this.getErrorMessage(error, "Login failed");

        if (message.toLowerCase().includes("email")) {
          emailError.textContent = message;
          emailInput.classList.add("auth-input-error");
        } else {
          passwordError.textContent = message;
          passwordInput.classList.add("auth-input-error");
        }

        return;
      }

      window.location.hash = RoutePath.Dashboard;
    } catch {
      formError.textContent = "Network error. Please try again.";
    } finally {
      const hasEmail = emailInput.value.trim().length > 0;
      const hasPassword = passwordInput.value.length > 0;

      submitButton.disabled = !(hasEmail && hasPassword);
      submitButton.textContent = "Login";
    }
  }
}
