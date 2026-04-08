import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import { updatePassword } from "../../api/auth.service.js";
import { supabase } from "../../api/supabase.js";
import { RoutePath } from "../../types/route-path.enum.js";

import "../login.page/login.page.style.css";

export class UpdatePasswordPage extends BasePage {
  create(parent: HTMLElement): void {
    void this.init(parent);
  }

  private async init(parent: HTMLElement): Promise<void> {
    parent.append(this.container);
    this.container.classList.add("auth-wrapper");

    const card = createElement("div", { className: "auth-card" });

    const title = createElement("h2", {
      textContent: "Set new password",
    });

    const form = createElement("form", { className: "auth-form" });

    const formInfo = createElement("p", {
      className: "auth-form-error",
    });

    const passwordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "New password",
        required: true,
      },
    });

    const confirmInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Confirm password",
        required: true,
      },
    });

    const submitButton = createElement("button", {
      textContent: "Update password",
      attrs: { type: "submit" },
    });

    const hash = window.location.hash;

    if (hash.includes("access_token")) {
      const parts = hash.split("#");
      const params = new URLSearchParams(parts[2] ?? "");

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token !== null && refresh_token !== null) {
        await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        window.location.hash = "#/update-password";
      }
    } else {
      formInfo.textContent = "Invalid or expired reset link";
    }

    form.addEventListener("submit", (e: SubmitEvent): void => {
      e.preventDefault();
      void this.handleSubmit(
        passwordInput,
        confirmInput,
        formInfo,
        submitButton,
      );
    });

    form.append(formInfo, passwordInput, confirmInput, submitButton);
    card.append(title, form);
    this.container.append(card);
  }

  private async handleSubmit(
    passwordInput: HTMLInputElement,
    confirmInput: HTMLInputElement,
    formInfo: HTMLElement,
    submitButton: HTMLButtonElement,
  ): Promise<void> {
    formInfo.textContent = "";

    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (password.length < 6) {
      formInfo.textContent = "Password must be at least 6 characters";
      return;
    }

    if (password !== confirmPassword) {
      formInfo.textContent = "Passwords do not match";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Updating...";

    try {
      const { error } = await updatePassword(password);

      if (error !== undefined) {
        formInfo.textContent = error.message;
        return;
      }

      formInfo.textContent = "Password updated successfully";

      passwordInput.disabled = true;
      confirmInput.disabled = true;
      submitButton.disabled = true;

      setTimeout(() => {
        window.location.hash = `#${RoutePath.Login}`;
      }, 2000);
    } catch {
      formInfo.textContent = "Something went wrong";
    } finally {
      submitButton.textContent = "Update password";
    }
  }
}
