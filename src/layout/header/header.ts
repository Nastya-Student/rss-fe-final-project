import HeaderCreator from "../../utils/header/header-creator.js";
import NavigationCreator from "../../utils/navigation/navigation-creator.js";
import UnorderedListCreator from "../../utils/unordered-list/unordered-list-creator.js";
import ListItemCreator from "../../utils/list-item/list-item-creator.js";
import AnchorCreator from "../../utils/anchor/anchor-creator.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import { RoutePath } from "../../types/route-path.enum.js";
import "./header.css";

export const ICONS = {
  logo: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="128.000000pt" height="128.000000pt" viewBox="0 0 128.000000 128.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M733 1108 c-16 -22 -266 -906 -260 -921 8 -21 57 -31 72 -15 12 13
265 884 265 912 0 9 -12 21 -26 26 -33 13 -40 13 -51 -2z"/>
<path d="M170 815 l-175 -175 177 -177 178 -178 32 33 33 32 -145 145 -145
145 145 145 144 144 -29 31 c-16 16 -31 30 -34 30 -4 0 -85 -79 -181 -175z"/>
<path d="M895 960 l-29 -31 144 -144 145 -145 -145 -145 -145 -145 33 -32 32
-33 178 178 177 177 -175 175 c-96 96 -177 175 -181 175 -3 0 -18 -14 -34 -30z"/>
</g>
</svg>`,
  moon: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="30.000000pt" height="30.000000pt" viewBox="0 0 30.000000 30.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M140 265 c0 -14 5 -25 10 -25 6 0 10 11 10 25 0 14 -4 25 -10 25 -5
0 -10 -11 -10 -25z"/>
<path d="M50 241 c0 -13 29 -35 37 -28 7 8 -15 37 -28 37 -5 0 -9 -4 -9 -9z"/>
<path d="M220 235 c-7 -9 -10 -18 -7 -22 8 -7 37 15 37 28 0 14 -16 11 -30 -6z"/>
<path d="M102 197 c-28 -30 -28 -68 1 -95 30 -28 68 -28 95 1 28 30 28 68 -1
95 -30 28 -68 28 -95 -1z"/>
<path d="M10 150 c0 -5 11 -10 25 -10 14 0 25 5 25 10 0 6 -11 10 -25 10 -14
0 -25 -4 -25 -10z"/>
<path d="M240 150 c0 -5 11 -10 25 -10 14 0 25 5 25 10 0 6 -11 10 -25 10 -14
0 -25 -4 -25 -10z"/>
<path d="M60 75 c-7 -9 -10 -18 -7 -22 8 -7 37 15 37 28 0 14 -16 11 -30 -6z"/>
<path d="M210 81 c0 -13 29 -35 37 -28 7 8 -15 37 -28 37 -5 0 -9 -4 -9 -9z"/>
<path d="M140 35 c0 -14 5 -25 10 -25 6 0 10 11 10 25 0 14 -4 25 -10 25 -5 0
-10 -11 -10 -25z"/>
</g>
</svg>`,
  sun: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M337 559 c-3 -11 -15 -23 -26 -26 -12 -3 -21 -9 -21 -13 0 -4 9 -10
21 -13 11 -3 23 -15 26 -26 7 -27 23 -27 23 -1 0 13 9 22 25 26 30 8 32 20 4
27 -11 3 -23 15 -26 26 -3 12 -9 21 -13 21 -4 0 -10 -9 -13 -21z"/>
<path d="M149 513 c-63 -57 -84 -104 -84 -193 0 -83 15 -121 69 -178 53 -57
101 -77 186 -77 89 0 136 21 193 84 47 52 47 62 0 49 -83 -23 -188 8 -249 74
-62 65 -88 161 -66 241 13 47 3 47 -49 0z"/>
<path d="M500 432 c0 -23 -30 -52 -53 -52 -9 0 -17 -4 -17 -10 0 -5 8 -10 18
-10 23 0 52 -30 52 -53 0 -9 5 -17 10 -17 6 0 10 8 10 18 0 23 30 52 53 52 9
0 17 5 17 10 0 6 -8 10 -18 10 -23 0 -52 30 -52 53 0 9 -4 17 -10 17 -5 0 -10
-8 -10 -18z"/>
</g>
</svg>`,
  flagRu: `<svg xmlns="http://www.w3.org/2000/svg" width="301" height="201" viewBox="0 0 301 201">
  <g fill="none">
  <path fill="#FFF" d="M.5.5h300v100H.5z"/>
  <path fill="#D52B1E" d="M.5 100.5h300v100H.5z"/>
  <path fill="#0039A6" d="M.5 67.166h300v66.667H.5z"/>
  </g>
  </svg>`,
  flagEn: `<svg xmlns="http://www.w3.org/2000/svg" width="301" height="151" 
  viewBox="0 0 301 151"><title>Gb SVG Icon</title>
  <g fill="none">
  <path fill="#FFF" d="M.5.5h299.843v149.983H.5z"/>
  <path fill="#CF142B" d="M135.428 90.444v60.039h29.988V90.444h134.928V60.46H165.416V.5h-29.988v59.96H.5v29.984z"/>
  <path fill="#00247D" d="M175.415 49.049V.5h97.08zm0 52.884v48.55h97.08zm-49.987 0v48.55H28.349zm0-52.884V.5H28.349zM.501 14.442v36.051h72.087zm299.842 0v36.051h-72.087zm0 122.099V100.49h-72.087zm-299.842 0V100.49h72.087z"/>
  <path fill="#CF142B" d="M300.343.5h-16.654L183.9 50.493h16.654L300.5.5m-183.557 99.987h-16.654L.5 150.48h16.654l99.946-49.993M83.768 50.532h16.653L.5.5v8.385zm133.255 49.936h-16.654L300.29 150.5v-8.385z"/>
  </g>
  </svg>`,
};

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

  const logoSvg1 = new ElementCreator({
    parent: logoLink,
    classes: ["logo-svg"],
  }).getElement();

  logoSvg1.innerHTML = ICONS.logo;
  new ElementCreator({
    parent: logoLink,
    classes: ["logo-text"],
    text: "Tandem",
  }).getElement();

  const logoSvg2 = new ElementCreator({
    parent: logoLink,
    classes: ["logo-svg"],
  }).getElement();

  logoSvg2.innerHTML = ICONS.logo;

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

  const themeDark = false;
  const themeButton = new ButtonCreator({
    classes: ["button", "button-theme"],
    parent: headerWrapper,
  }).getElement();

  themeButton.innerHTML = themeDark ? ICONS.sun : ICONS.moon;

  const langEn = true;
  const langButton = new ButtonCreator({
    classes: ["button", "button-lang"],
    parent: headerWrapper,
  }).getElement();

  langButton.innerHTML = langEn ? ICONS.flagEn : ICONS.flagRu;

  return header.getElement();
}
