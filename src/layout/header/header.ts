import HeaderCreator from "../../utils/header/header-creator.js";
import NavigationCreator from "../../utils/navigation/navigation-creator.js";
import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator.js";
import ListItemCreator from "../../utils/list-item/list-item-creator.js";
import AnchorCreator from "../../utils/anchor/anchor-creator.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import { RoutePath } from "../../types/route-path.enum.js";
import { CLASS_NAME } from "../../constants.js";
import { EVENT } from "../../constants.js";
import "./header.css";

export default function headerCreator(): HTMLElement {
  const header = new HeaderCreator({
    classes: [CLASS_NAME.header],
  }).getElement();

  const logo = new ElementCreator({
    parent: header,
    classes: ["logo"],
  }).getElement();

  const logoLink = new AnchorCreator({
    parent: logo,
    href: "/#",
    target: "_self",
    classes: ["logo-link"],
  }).getElement();

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
    parent: header,
    classes: ["header-wrapper"],
  }).getElement();

  let authorized: boolean = true;

  if (authorized) {
    const navigation = new NavigationCreator({
      parent: headerWrapper,
      classes: [CLASS_NAME.nav],
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
      classes: [CLASS_NAME.button, "button-header"],
    }).getElement();
    logoutButton.dataset.route = RoutePath.Login;
  } else {
    const registerButton = new ButtonCreator({
      parent: headerWrapper,
      text: "Register",
      classes: [CLASS_NAME.button, "button-header"],
    }).getElement();
    registerButton.dataset.route = RoutePath.Register;

    const loginButton = new ButtonCreator({
      parent: headerWrapper,
      text: "Login",
      classes: [CLASS_NAME.button, "button-header"],
    }).getElement();
    loginButton.dataset.route = RoutePath.Login;
  }

  authorized = true;

  const themeButton = new ButtonCreator({
    classes: [CLASS_NAME.button, "button-theme"],
    parent: headerWrapper,
  }).getElement();

  themeButton.addEventListener(EVENT.click, () => {
    themeButton.classList.toggle("dark");
  });

  let langEn = true;
  const langButton = new ButtonCreator({
    classes: [CLASS_NAME.button, "button-lang"],
    parent: headerWrapper,
  }).getElement();

  langButton.textContent = langEn ? "EN" : "RU";

  langButton.addEventListener(EVENT.click, () => {
    langEn = !langEn;
    langButton.textContent = langEn ? "EN" : "RU";
  });

  return header;
}
