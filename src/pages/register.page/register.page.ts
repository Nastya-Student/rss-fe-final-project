import { HEADINGS_TWO } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import "../login.page/style.css";

export class RegisterPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);

    this.container.classList.add("auth-wrapper");

    const card = createElement("div", {
      className: "auth-card",
    });

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: card,
    }).getElement();
    pageTitle.textContent = "Register";

    const form = createElement("form", {
      className: "auth-form",
    });

    const nameInput = createElement("input", {
      attrs: {
        type: "text",
        placeholder: "Name",
        required: "",
      },
    });

    const emailInput = createElement("input", {
      attrs: {
        type: "email",
        placeholder: "Email",
        required: "",
      },
    });

    const passwordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Password",
        required: "",
      },
    });

    const confirmPasswordInput = createElement("input", {
      attrs: {
        type: "password",
        placeholder: "Confirm Password",
        required: "",
      },
    });

    const submitButton = createElement("button", {
      textContent: "Create Account",
      attrs: {
        type: "submit",
      },
    });

    form.append(
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (!name || !email || !password || !confirmPassword) return;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      window.location.hash = RoutePath.Dashboard;
    });
    const switchBlock = createElement("div", {
      className: "switch-block",
    });

    const loginButton = new ButtonCreator({
      text: "Already have an account? Login",
      classes: ["button"],
      parent: switchBlock,
    }).getElement();

    loginButton.dataset.route = RoutePath.Login;

    card.append(form, switchBlock);
    this.container.append(card);
  }
}
