import FooterCreator from "../../utils/footer/footer-creator";
import AnchorCreator from "../../utils/anchor/anchor-creator";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator";
import ElementCreator from "../../utils/element-creator";
import "./footer.css";

export default function footerCreator(): HTMLElement {
  const footer = new FooterCreator({
    classes: ["footer"],
  }).getElement();

  new AnchorCreator({
    parent: footer,
    href: "https://github.com/Nastya-Student/rss-fe-final-project",
    target: "_blank",
    classes: ["authors-link"],
    text: "©T-8",
  }).getElement();

  const footerWrapper = new ElementCreator({
    parent: footer,
    classes: ["footer-wrapper"],
  }).getElement();

  new ParagraphCreator({
    parent: footerWrapper,
    classes: ["school-text"],
    text: "Created at ",
  }).getElement();

  new AnchorCreator({
    parent: footerWrapper,
    href: "https://rs.school/js",
    target: "_blank",
    classes: ["school-link"],
    text: " RS School",
  }).getElement();

  new ParagraphCreator({
    parent: footer,
    classes: ["year-text"],
    text: "2026",
  }).getElement();

  return footer;
}
