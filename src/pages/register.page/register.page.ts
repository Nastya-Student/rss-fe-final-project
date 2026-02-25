import { RoutePath } from "../../types/route-path.enum.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import { register } from "../../api/auth.service.js";
import "../login.page/login.page.style.css";

export class RegisterPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("auth-wrapper");

    const card = createElement("div", {
      className: "auth-card",
    });

    const pageTitle = createElement("h2", {
      textContent: "Register",
    });

    const form = createElement("form", {
      className: "auth-form",
    });

    const nameInput = createElement("input", {
      attrs: {
        type: "text",
        placeholder: "Name",
        required: true,
      },
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

    const confirmPasswordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Confirm Password",
        required: true,
      },
    });

    const submitButton = createElement("button", {
      textContent: "Create Account",
      attrs: { type: "submit" },
    });

    const errorMessage = createElement("p", {
      className: "auth-error",
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      void this.handleSubmit(
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        errorMessage,
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
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
      errorMessage,
    );

    switchBlock.append(loginButton);
    card.append(pageTitle, form, switchBlock);
    this.container.append(card);
  }

  private async handleSubmit(
    nameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    confirmPasswordInput: HTMLInputElement,
    errorMessage: HTMLElement,
    submitButton: HTMLButtonElement,
  ): Promise<void> {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!name || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match";
      return;
    }

    submitButton.setAttribute("disabled", "true");
    errorMessage.textContent = "";

    const { error } = await register(email, password, name);

    submitButton.removeAttribute("disabled");

    if (error) {
      errorMessage.textContent = error.message;
      return;
    }

    window.location.hash = RoutePath.Dashboard;
  }
}
