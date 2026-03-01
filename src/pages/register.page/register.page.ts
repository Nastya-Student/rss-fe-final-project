import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import { register } from "../../api/auth.service.js";
import "../login.page/login.page.style.css";

export class RegisterPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("auth-wrapper");

    const card = createElement("div", { className: "auth-card" });
    const pageTitle = createElement("h2", { textContent: "Register" });
    const form = createElement("form", { className: "auth-form" });

    const createField = (input: HTMLInputElement) => {
      const wrapper = createElement("div", { className: "form-field" });
      const error = createElement("p", { className: "field-error" });
      wrapper.append(input, error);
      return { wrapper, error };
    };

    const nameInput = createElement("input", {
      attrs: { type: "text", placeholder: "Name", required: true },
    });

    const emailInput = createElement("input", {
      attrs: {
        type: "email",
        placeholder: "Email",
        required: true,
        autocomplete: "email",
      },
    });

    const passwordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Password",
        required: true,
        autocomplete: "new-password",
      },
    });

    const confirmPasswordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Confirm Password",
        required: true,
        autocomplete: "new-password",
      },
    });

    const nameField = createField(nameInput);
    const emailField = createField(emailInput);
    const passwordField = createField(passwordInput);
    const confirmField = createField(confirmPasswordInput);

    const submitButton = createElement("button", {
      textContent: "Create Account",
      attrs: { type: "submit", disabled: true },
    });

    const updateSubmitState = () => {
      submitButton.disabled =
        !nameInput.value.trim() ||
        !emailInput.value.trim() ||
        !passwordInput.value ||
        !confirmPasswordInput.value;
    };

    nameInput.addEventListener("input", updateSubmitState);
    emailInput.addEventListener("input", updateSubmitState);
    passwordInput.addEventListener("input", updateSubmitState);
    confirmPasswordInput.addEventListener("input", updateSubmitState);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      void this.handleSubmit(
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        nameField.error,
        emailField.error,
        passwordField.error,
        confirmField.error,
        submitButton,
      );
    });

    const switchBlock = createElement("div", {
      className: "switch-block",
    });

    const loginButton = createElement("button", {
      textContent: "Already have an account? Login",
      className: "button",
    });

    loginButton.dataset.route = RoutePath.Login;

    form.append(
      nameField.wrapper,
      emailField.wrapper,
      passwordField.wrapper,
      confirmField.wrapper,
      submitButton,
    );

    switchBlock.append(loginButton);
    card.append(pageTitle, form, switchBlock);
    this.container.append(card);

    nameInput.focus();
  }

  private async handleSubmit(
    nameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    confirmPasswordInput: HTMLInputElement,
    nameError: HTMLElement,
    emailError: HTMLElement,
    passwordError: HTMLElement,
    confirmError: HTMLElement,
    submitButton: HTMLButtonElement,
  ): Promise<void> {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    for (const el of [nameError, emailError, passwordError, confirmError]) {
      el.textContent = "";
    }

    for (const input of [
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    ]) {
      input.classList.remove("input-error");
    }

    if (!name) {
      nameError.textContent = "Name is required";
      nameInput.classList.add("input-error");
      return;
    }

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

    if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordInput.classList.add("input-error");
      return;
    }

    if (password !== confirmPassword) {
      confirmError.textContent = "Passwords do not match";
      confirmPasswordInput.classList.add("input-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Creating account...";

    try {
      const { error } = await register(email, password, name);

      if (error) {
        emailError.textContent = error.message;
        emailInput.classList.add("input-error");
        return;
      }

      window.location.hash = RoutePath.Dashboard;
    } catch {
      emailError.textContent = "Network error. Please try again.";
      emailInput.classList.add("input-error");
    } finally {
      submitButton.disabled =
        !nameInput.value.trim() ||
        !emailInput.value.trim() ||
        !passwordInput.value ||
        !confirmPasswordInput.value;

      submitButton.textContent = "Create Account";
    }
  }
}
