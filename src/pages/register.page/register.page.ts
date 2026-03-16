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

    const createField = (input: HTMLInputElement): AuthField => {
      const wrapper = createElement("div", { className: "auth-form-field" });
      const error = createElement("p", { className: "auth-field-error" });
      wrapper.append(input, error);
      return { wrapper, input, error };
    };

    const name = createField(
      createElement("input", {
        attrs: { type: "text", placeholder: "Name", required: true },
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

    const updateSubmitState = () => {
      submitButton.disabled = fields.some((field) => !field.input.value.trim());
    };

    for (const field of fields) {
      field.input.addEventListener("input", updateSubmitState);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      void this.handleSubmit(fields, submitButton);
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
    fields: AuthField[],
    submitButton: HTMLButtonElement,
  ): Promise<void> {
    const [name, email, password, confirm] = fields as [
      AuthField,
      AuthField,
      AuthField,
      AuthField,
    ];

    for (const field of fields) {
      field.error.textContent = "";
      field.input.classList.remove("auth-input-error");
    }

    const nameValue = name.input.value.trim();
    const emailValue = email.input.value.trim().toLowerCase();
    const passwordValue = password.input.value;
    const confirmValue = confirm.input.value;

    if (!nameValue) {
      name.error.textContent = "Name is required";
      name.input.classList.add("auth-input-error");
      return;
    }

    if (!emailValue.includes("@")) {
      email.error.textContent = "Invalid email format";
      email.input.classList.add("auth-input-error");
      return;
    }

    if (passwordValue.length < 6) {
      password.error.textContent = "Password must be at least 6 characters";
      password.input.classList.add("auth-input-error");
      return;
    }

    if (passwordValue !== confirmValue) {
      confirm.error.textContent = "Passwords do not match";
      confirm.input.classList.add("auth-input-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Creating account...";

    try {
      const { error } = await register(emailValue, passwordValue, nameValue);

      if (error) {
        email.error.textContent = error.message;
        email.input.classList.add("auth-input-error");
        return;
      }

      window.location.hash = RoutePath.Dashboard;
    } catch {
      email.error.textContent = "Network error. Please try again.";
      email.input.classList.add("auth-input-error");
    } finally {
      submitButton.textContent = "Create Account";
      submitButton.disabled = fields.some((field) => !field.input.value.trim());
    }
  }
}
