import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import { register } from "../../api/auth.service.js";

import "../login.page/login.page.style.css";

type AuthField = {
  wrapper: HTMLDivElement;
  input: HTMLInputElement;
  error: HTMLParagraphElement;
};

export class RegisterPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("auth-wrapper");

    const card = createElement("div", { className: "auth-card" });
    const pageTitle = createElement("h2", { textContent: "Register" });

    const form = createElement("form", {
      className: "auth-form",
      attrs: { novalidate: true },
    });

    const formError = createElement("p", {
      className: "auth-form-error",
    });

    const createField = (input: HTMLInputElement): AuthField => {
      const wrapper = createElement("div", { className: "auth-form-field" });
      const error = createElement("p", { className: "auth-field-error" });
      wrapper.append(input, error);
      return { wrapper, input, error };
    };

    const name = createField(
      createElement("input", {
        attrs: {
          type: "text",
          placeholder: "Name",
          required: true,
          autocomplete: "name",
        },
      }),
    );

    const email = createField(
      createElement("input", {
        attrs: {
          type: "email",
          placeholder: "Email",
          required: true,
          autocomplete: "email",
        },
      }),
    );

    const password = createField(
      createElement("input", {
        attrs: {
          type: "password",
          placeholder: "Password",
          required: true,
          autocomplete: "new-password",
        },
      }),
    );

    const confirm = createField(
      createElement("input", {
        attrs: {
          type: "password",
          placeholder: "Confirm Password",
          required: true,
          autocomplete: "new-password",
        },
      }),
    );

    const fields: AuthField[] = [name, email, password, confirm];

    const submitButton = createElement("button", {
      textContent: "Create Account",
      attrs: { type: "submit", disabled: true },
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const clearErrors = () => {
      formError.textContent = "";

      for (const field of fields) {
        field.error.textContent = "";
        field.input.classList.remove("auth-input-error");
      }
    };

    const validate = (): boolean => {
      clearErrors();

      const nameValue = name.input.value.trim();
      const emailValue = email.input.value.trim().toLowerCase();
      const passwordValue = password.input.value;
      const confirmValue = confirm.input.value;

      if (nameValue.length < 2) {
        name.error.textContent = "Name must be at least 2 characters";
        name.input.classList.add("auth-input-error");
        return false;
      }

      if (!emailRegex.test(emailValue)) {
        email.error.textContent = "Invalid email format";
        email.input.classList.add("auth-input-error");
        return false;
      }

      if (passwordValue.length < 6) {
        password.error.textContent = "Password must be at least 6 characters";
        password.input.classList.add("auth-input-error");
        return false;
      }

      if (!/[A-Za-z]/.test(passwordValue) || !/\d/.test(passwordValue)) {
        password.error.textContent =
          "Password must contain letters and numbers";
        password.input.classList.add("auth-input-error");
        return false;
      }

      if (passwordValue !== confirmValue) {
        confirm.error.textContent = "Passwords do not match";
        confirm.input.classList.add("auth-input-error");
        return false;
      }

      return true;
    };

    const updateSubmitState = (): void => {
      const hasValues = fields.every((f) => f.input.value.trim().length > 0);
      submitButton.disabled = !hasValues;
    };

    for (const field of fields) {
      field.input.addEventListener("input", updateSubmitState);
    }

    form.addEventListener("submit", (e: SubmitEvent): void => {
      e.preventDefault();

      if (!validate()) {
        return;
      }

      void this.handleSubmit(
        name.input.value.trim(),
        email.input.value.trim().toLowerCase(),
        password.input.value,
        submitButton,
        formError,
        email,
        password,
      );
    });

    const switchBlock = createElement("div", {
      className: "auth-switch-block",
    });

    const loginButton = createElement("button", {
      textContent: "Already have an account? Login",
      className: "auth-button",
    });

    loginButton.dataset.route = RoutePath.Login;

    form.append(
      formError,
      name.wrapper,
      email.wrapper,
      password.wrapper,
      confirm.wrapper,
      submitButton,
    );

    switchBlock.append(loginButton);
    card.append(pageTitle, form, switchBlock);
    this.container.append(card);

    name.input.focus();
  }

  private async handleSubmit(
    name: string,
    email: string,
    password: string,
    submitButton: HTMLButtonElement,
    formError: HTMLElement,
    emailField: AuthField,
    passwordField: AuthField,
  ): Promise<void> {
    formError.textContent = "";

    submitButton.disabled = true;
    submitButton.textContent = "Creating account...";

    try {
      const { error } = await register(email, password, name);

      if (error !== undefined) {
        const message = error.message.toLowerCase();

        if (message.includes("password")) {
          passwordField.error.textContent = error.message;
          passwordField.input.classList.add("auth-input-error");
        } else {
          emailField.error.textContent = error.message;
          emailField.input.classList.add("auth-input-error");
        }

        return;
      }

      window.location.hash = `#${RoutePath.Dashboard}`;
    } catch {
      formError.textContent = "Network error. Please try again.";
    } finally {
      submitButton.textContent = "Create Account";
      submitButton.disabled = false;
    }
  }
}
