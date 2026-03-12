import {
  CLASS_NAME,
  EVENT,
  HEADINGS_THREE,
  HEADINGS_TWO,
} from "../../constants.js";
import { AsyncSorterPayload } from "../../interfaces/widget-payload.interfaces.js";
import { AsyncSorterAnswer } from "../../interfaces/widget-user-answer.interfaces.js";
import {
  CLASS_NAMES_PRACTICE,
  STRING_CONSTANTS_PRACTICE,
} from "../../pages/practice.page/practice.page.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import { delay } from "../../utils/delay.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import "./async-sorter.widget.css";
import Sortable from "sortablejs";

export default function asyncSorterWidget(
  payload: AsyncSorterPayload,
  onAnswer: (answer: AsyncSorterAnswer) => void,
): HTMLElement {
  const asyncSorterWidgetContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_PRACTICE.asyncSorterWidgetContainer,
      CLASS_NAME.cardElement,
    ],
  }).getElement();

  new HeadingsCreator(HEADINGS_TWO, {
    parent: asyncSorterWidgetContainer,
    classes: ["async-sorter__code-title"],
    text: "Async Sorter",
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: asyncSorterWidgetContainer,
    text: payload.title,
  }).getElement();

  const codeContainer = new ElementCreator({
    classes: ["async-sorter__code-container", CLASS_NAME.cardElement],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  const codeLines = payload.code.split("\n");
  const codeBlockValues: string[] = [];

  for (const codeLine of codeLines) {
    if (codeLine.includes("console.log")) {
      const start = codeLine.indexOf("console.log") + "console.log(".length + 1;
      const end = codeLine.indexOf(")", start) - 1;
      let value = codeLine.slice(start, end);
      if (value === "") {
        value = codeLine.slice(start - 1, end + 1);
      }
      codeBlockValues.push(value);
    }
    new ParagraphCreator({
      parent: codeContainer,
      text: codeLine,
    }).getElement();
  }

  new HeadingsCreator(HEADINGS_THREE, {
    parent: asyncSorterWidgetContainer,
    text: "Code Blocks",
  }).getElement();

  const codeBlocksContainer = new ElementCreator({
    classes: ["async-sorter__code-blocks-container", CLASS_NAME.cardElement],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  for (const value of codeBlockValues) {
    new ElementCreator({
      parent: codeBlocksContainer,
      text: value,
      classes: ["async-sorter__code-block"],
    }).getElement();
  }

  const bucketsContainer = new ElementCreator({
    classes: ["async-sorter__buckets-container"],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  const bucketNamesMap = new Map<string, string>([
    ["callstack", "Call Stack"],
    ["microtasks", "Microtasks"],
    ["macrotasks", "Macrotasks"],
  ]);

  const dropZones: HTMLElement[] = [];

  for (const [bucket, bucketName] of bucketNamesMap.entries()) {
    const bucketElement = new ElementCreator({
      parent: bucketsContainer,
      classes: ["async-sorter__bucket", CLASS_NAME.cardElement],
    }).getElement();

    if (bucketName) {
      new ParagraphCreator({
        parent: bucketElement,
        text: bucketName,
      }).getElement();
    }

    const dropZone = new ElementCreator({
      parent: bucketElement,
      classes: ["async-sorter__drop-zone"],
    }).getElement();

    dropZone.dataset.name = bucket;
    dropZones.push(dropZone);
  }

  Sortable.create(codeBlocksContainer, {
    group: "asyncSorter",
    animation: 150,
    ghostClass: "dragging",
  });

  for (const dropZone of dropZones) {
    Sortable.create(dropZone, {
      group: "asyncSorter",
      animation: 150,
      ghostClass: "dragging",
    });
  }

  const runButton = new ButtonCreator({
    text: "Run",
    classes: [CLASS_NAME.button],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: asyncSorterWidgetContainer,
    text: "Output",
  }).getElement();

  const outputContainer = new ElementCreator({
    classes: ["async-sorter__output-container", CLASS_NAME.cardElement],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  runButton.addEventListener(EVENT.click, () => {
    outputContainer.innerHTML = "";
    const output = getAnswer(dropZones).answer.at(-1)?.items;
    if (output) {
      void (async () => {
        for (const element of output) {
          await delay(400);
          new ParagraphCreator({
            parent: outputContainer,
            text: element,
          }).getElement();
        }
      })();
    }
  });

  const submitButton = new ButtonCreator({
    text: STRING_CONSTANTS_PRACTICE.submit,
    classes: [CLASS_NAME.button],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(getAnswer(dropZones));
    submitButton.classList.add(CLASS_NAME.noActive);
    submitButton.disabled = true;
  });

  return asyncSorterWidgetContainer;
}

function getAnswer(dropZones: HTMLElement[]): AsyncSorterAnswer {
  const answer: { name: string; items: string[] }[] = [];
  const output: string[] = [];
  for (const dropZone of dropZones) {
    const name = dropZone.dataset.name;
    if (name !== undefined) {
      const items = [...dropZone.children].map((el) => el.textContent);
      output.push(...items);
      answer.push({ name, items });
    }
  }
  answer.push({ name: "output", items: output });
  return { answer };
}
