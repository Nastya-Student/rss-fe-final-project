import HeaderCreator from "../../utils/header/header-creator.js";
//import NavigationCreator from "../../utils/navigation/navigation-creator.js";
//import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator.js";
//import ListItemCreator from "../../utils/list-item/list-item-creator.js";
//import AnchorCreator from "../../utils/anchor/anchor-creator.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import { RoutePath } from "../../types/route-path.enum.js";

import "./header.css";

export const Header = new HeaderCreator({
  classes: ["header"],
}).getElement();

// const Navigation = new NavigationCreator({
//   parent: Header,
//   classes: ["nav"],
// }).getElement();

// const NavigationList = new UnorderedListCreator({
//   parent: Navigation,
//   classes: ["nav-list"],
// }).getElement();

// const linksArray: string[] = ["Dashboard", "Profile"];

// linksArray.forEach((link) => {
//   const NavigationItem = new ListItemCreator({
//     parent: NavigationList,
//     classes: ["nav-item"],
//     text: link,
//   }).getElement();

//   // const NavigationLink = new AnchorCreator({
//   //   parent: NavigationItem,
//   //   href: link,
//   //   target: "xz",
//   // }).getElement();
// });

const loginButton = new ButtonCreator({
  // такое же назаание?
  text: "Login",
  classes: ["button"],
  parent: Header,
}).getElement();
loginButton.dataset.route = RoutePath.Login;
