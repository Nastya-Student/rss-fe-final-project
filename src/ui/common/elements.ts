export type Element = {
  tag: string;
  id?: string;
  class?: string;
  text?: string;
};

export const createElement = <T extends HTMLElement>(
  properties: Element,
): T => {
  const element = document.createElement(properties.tag) as T;
  if (properties.class != undefined) {
    element.classList.add(properties.class);
  }
  if (properties.id != undefined) {
    element.id = properties.id;
  }
  if (properties.text != undefined) {
    element.textContent = properties.text;
  }

  return element;
};

export const createButton = (
  properties: Element,
  disabled: boolean,
): HTMLButtonElement => {
  const button = createElement<HTMLButtonElement>(properties);
  button.disabled = disabled;
  return button;
};
