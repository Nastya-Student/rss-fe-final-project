export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    className?: string;
    textContent?: string;
    attrs?: Partial<HTMLElementTagNameMap[K]>;
    dataset?: Record<string, string>;
    children?: (HTMLElement | string)[];
  },
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (options?.className !== undefined) {
    element.className = options.className;
  }

  if (options?.textContent !== undefined) {
    element.textContent = options.textContent;
  }

  if (options?.attrs !== undefined) {
    Object.assign(element, options.attrs);
  }

  if (options?.dataset !== undefined) {
    for (const [key, value] of Object.entries(options.dataset)) {
      element.dataset[key] = value;
    }
  }

  if (options?.children !== undefined) {
    for (const child of options.children) {
      element.append(child);
    }
  }

  return element;
}
