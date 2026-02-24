export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    className?: string;
    textContent?: string;
    attrs?: Record<string, string>;
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
    for (const [key, value] of Object.entries(options.attrs)) {
      element.setAttribute(key, value);
    }
  }

  return element;
}
