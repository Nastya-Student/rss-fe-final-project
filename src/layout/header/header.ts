import HeaderCreator from "../../utils/header/header-creator.js";
import NavigationCreator from "../../utils/navigation/navigation-creator.js";
import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator.js";
import ListItemCreator from "../../utils/list-item/list-item-creator.js";
import AnchorCreator from "../../utils/anchor/anchor-creator.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import { RoutePath } from "../../types/route-path.enum.js";
import "./header.css";

export default function headerCreator(): HTMLElement {
  const header = new HeaderCreator({
    classes: ["header"],
  });

  const logo = new ElementCreator({
    parent: header.getElement(),
    classes: ["logo"],
  }).getElement();

  const logoLink = new AnchorCreator({
    parent: logo,
    href: "/#",
    target: "blanc",
    classes: ["logo-link"],
  }).getElement();
  logoLink.style.display = "flex";

  new ElementCreator({
    parent: logoLink,
    classes: ["logo-svg"],
  }).getElement();

  new ElementCreator({
    parent: logoLink,
    classes: ["logo-text"],
    text: "Tandem",
  }).getElement();

  new ElementCreator({
    parent: logoLink,
    classes: ["logo-svg"],
  }).getElement();

  const headerWrapper = new ElementCreator({
    parent: header.getElement(),
    classes: ["header-wrapper"],
  }).getElement();

  let authorized: boolean;
  authorized = true;

  if (authorized) {
    const navigation = new NavigationCreator({
      parent: headerWrapper,
      classes: ["nav"],
    }).getElement();

    const navigationList = new UnorderedListCreator({
      parent: navigation,
      classes: ["nav-list"],
    }).getElement();

    const linksArray: string[] = ["Dashboard", "Profile"];

    for (const link of linksArray) {
      const navigationItem = new ListItemCreator({
        parent: navigationList,
        classes: ["nav-item"],
      }).getElement();

      new AnchorCreator({
        parent: navigationItem,
        href: `#/${link.toLowerCase()}`,
        target: "_self",
        classes: ["nav-link"],
        text: link,
      }).getElement();
    }

    const logoutButton = new ButtonCreator({
      parent: headerWrapper,
      text: "Logout",
      classes: ["button", "button-header"],
    }).getElement();
    logoutButton.dataset.route = RoutePath.Login;
  } else {
    const registerButton = new ButtonCreator({
      parent: headerWrapper,
      text: "Register",
      classes: ["button", "button-header"],
    }).getElement();
    registerButton.dataset.route = RoutePath.Register;

    const loginButton = new ButtonCreator({
      parent: headerWrapper,
      text: "Login",
      classes: ["button", "button-header"],
    }).getElement();
    loginButton.dataset.route = RoutePath.Login;
  }

  authorized = true;

  const themeButton = new ButtonCreator({
    classes: ["button", "button-theme"],
    parent: headerWrapper,
  }).getElement();

  themeButton.addEventListener("click", () => {
    themeButton.classList.toggle("dark");
  });

  let langEn = true;
  const langButton = new ButtonCreator({
    classes: ["button", "button-lang"],
    parent: headerWrapper,
  }).getElement();

  langButton.textContent = langEn ? "EN" : "RU";

  langButton.addEventListener("click", () => {
    langEn = !langEn;
    langButton.textContent = langEn ? "EN" : "RU";
  });

  return header.getElement();
}
