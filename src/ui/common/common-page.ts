import { CLASS_NAME, ID, TAG } from "../../constants.js";
import { createElement } from "./elements.js";

export const renderCommonPage = (): void => {
  const container = createElement({
    tag: TAG.div,
    id: ID.container,
    class: CLASS_NAME.container,
  });

  const header = createElement({ tag: TAG.header, id: ID.header });
  const main = createElement({ tag: TAG.main, id: ID.main });
  const footer = createElement({ tag: TAG.footer, id: ID.footer });

  container.append(header, main, footer);
  document.body.append(container);
};
