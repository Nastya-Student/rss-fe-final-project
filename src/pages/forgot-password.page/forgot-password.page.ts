import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import { resetPassword } from "../../api/auth.service.js";

import "../login.page/login.page.style.css";

export class ForgotPasswordPage extends BasePage {
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

    const title = createElement("h2", {
      textContent: "Forgot password",
    });

    const description = createElement("p", {
      className: "auth-description",
      textContent: "Enter your email and we’ll send you a reset link",
    });

    const form = createElement("form", { className: "auth-form" });

    const formInfo = createElement("p", {
      className: "auth-form-message",
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

    const submitButton = createElement("button", {
      textContent: "Send reset link",
      attrs: { type: "submit", disabled: true },
    });

    const backButton = createElement("button", {
      textContent: "Back to login",
      className: "auth-button",
      attrs: { type: "button" },
    });

    backButton.addEventListener("click", (): void => {
      window.location.hash = `#${RoutePath.Login}`;
    });

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

    const updateSubmitState = (): void => {
      const email = emailInput.value.trim();
      submitButton.disabled = email.length === 0;
    };

    emailInput.addEventListener("input", updateSubmitState);
    emailInput.addEventListener("blur", validateEmail);

    form.addEventListener("submit", (e: SubmitEvent): void => {
      e.preventDefault();

      if (!validateEmail()) {
        return;
      }

      void this.handleSubmit(emailInput, formInfo, submitButton);
    });

    form.append(formInfo, emailField, submitButton);
    card.append(title, description, form, backButton);
    this.container.append(card);

    emailInput.focus();
  }

  private async handleSubmit(
    emailInput: HTMLInputElement,
    formInfo: HTMLElement,
    submitButton: HTMLButtonElement,
  ): Promise<void> {
    const email = emailInput.value.trim().toLowerCase();

    formInfo.textContent = "";

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const { error } = await resetPassword(email);

      if (error !== null && error !== undefined) {
        formInfo.textContent = this.getErrorMessage(
          error,
          "Failed to send reset link",
        );
        return;
      }

      formInfo.textContent =
        "If this email exists, you will receive a reset link shortly.";

      emailInput.disabled = true;
      submitButton.disabled = true;
    } catch {
      formInfo.textContent = "Network error. Please try again.";
    } finally {
      submitButton.textContent = "Send reset link";
    }
  }
}
