import { CLASS_NAME, ID, TAG } from "../../constants.js";
import ElementCreator from "./components/base-component.js";

export const renderCommonPage = (): void => {
  const container = new ElementCreator({
    tag: TAG.div,
    id: ID.container,
    classes: [CLASS_NAME.container],
  }).getElement();

  const header = new ElementCreator({
    tag: TAG.header,
    id: ID.header,
  }).getElement();
  const main = new ElementCreator({ tag: TAG.main, id: ID.main }).getElement();
  const footer = new ElementCreator({
    tag: TAG.footer,
    id: ID.footer,
  }).getElement();

  container.append(header, main, footer);
  document.body.append(container);
};
