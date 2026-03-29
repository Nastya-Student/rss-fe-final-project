import Sortable from "sortablejs";
import { createElement } from "../../utils/create-element.js";

import "./code-ordering.widget.css";

type CodeOrderingPayload = {
  title: string;
  description: string;
  lines: string[];
  correctOrder: number[];
};

type CodeOrderingAnswer = {
  order: number[];
};

export default function codeOrderingWidget(
  payload: CodeOrderingPayload,
  onAnswer: (answer: CodeOrderingAnswer) => void,
): HTMLElement {
  const items = payload.lines
    .map((line, index) => ({ line, index }))
    .sort(() => Math.random() - 0.5);

  const list = createElement("div", {
    className: "code-ordering__list",
  });

  for (const item of items) {
    const el = createElement("div", {
      className: "code-ordering__item",
      textContent: item.line,
      dataset: {
        index: String(item.index),
      },
    });

    list.append(el);
  }

  const button = createElement("button", {
    className: "button", // 👈 добавили класс
    textContent: "Submit",
    attrs: {
      disabled: true,
    },
  });

  Sortable.create(list, {
    animation: 150,
    ghostClass: "dragging",
    onChange: () => {
      button.disabled = false;
    },
  });

  button.addEventListener("click", () => {
    const order: number[] = [...list.children].map((el) =>
      Number((el as HTMLElement).dataset.index),
    );

    for (const [i, el] of [...list.children].entries()) {
      const index = Number((el as HTMLElement).dataset.index);

      el.classList.remove("correct", "wrong");

      if (index === payload.correctOrder[i]) {
        el.classList.add("correct");
      } else {
        el.classList.add("wrong");
      }
    }

    button.disabled = true;

    onAnswer({ order });
  });

  const container = createElement("div", {
    className: "code-ordering",
    children: [
      createElement("h3", { textContent: payload.title }),
      createElement("p", { textContent: payload.description }),
      list,
      button,
    ],
  });

  return container;
}
