import FooterCreator from "../../utils/footer/footer-creator";
import AnchorCreator from "../../utils/anchor/anchor-creator";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator";
import "./footer.css";

export default function footerCreator(): HTMLElement {
  const footer = new FooterCreator({
    classes: ["footer"],
  }).getElement();

  new AnchorCreator({
    parent: footer,
    classes: ["footer__project-link"],
    href: "https://github.com/Nastya-Student/rss-fe-final-project",
    target: "_blank",
    text: "© T-8",
  }).getElement();

  new AnchorCreator({
    parent: footer,
    classes: ["rs-logo"],
    href: "https://rs.school/",
    target: "_blank",
  }).getElement();

  new ParagraphCreator({
    parent: footer,
    classes: ["footer__year"],
    text: "2026",
  }).getElement();

  return footer;
}
