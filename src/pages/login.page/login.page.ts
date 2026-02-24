import { HEADINGS_TWO } from "../../constants.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";
import { createElement } from "../../utils/create-element.js";
import "./style.css";

export class LoginPage extends BasePage {
  create(parent: HTMLElement): void {
    parent.append(this.container);

    this.container.classList.add("auth-wrapper");

    const card = createElement("div", {
      className: "auth-card",
    });

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: card,
    }).getElement();
    pageTitle.textContent = "Login";

    const form = createElement("form", {
      className: "auth-form",
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

    const submitButton = createElement("button", {
      textContent: "Login",
      attrs: {
        type: "submit",
      },
    });

    form.append(emailInput, passwordInput, submitButton);

    const switchBlock = createElement("div", {
      className: "switch-block",
    });

    const registerButton = new ButtonCreator({
      text: "Don't have an account? Register",
      classes: ["button"],
      parent: switchBlock,
    }).getElement();

    registerButton.dataset.route = RoutePath.Register;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value;
      const password = passwordInput.value;

      if (!email || !password) return;

      window.location.hash = RoutePath.Dashboard;
    });

    card.append(form, switchBlock);
    this.container.append(card);
  }
}
