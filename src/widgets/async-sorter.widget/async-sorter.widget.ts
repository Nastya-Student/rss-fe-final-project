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
import { offButton } from "../../utils/off-button.js";
import ParagraphCreator from "../../utils/paragraph/paragraph-creator.js";
import PreCreator from "../../utils/pre/pre-creator.js";
import "./async-sorter.widget.css";
import Sortable from "sortablejs";

export const CLASS_NAMES_ASYNC_SORTER_WIDGET = {
  asyncSorterTitle: "async-sorter__async-sorter-title",
  widgetDescription: "async-sorter__widget-description",
  codeContainer: "async-sorter__code-container",
  codeBlocksContainer: "async-sorter__code-blocks-container",
  codeBlock: "async-sorter__code-block",
  bucketsContainer: "async-sorter__buckets-container",
  bucket: "async-sorter__bucket",
  dropZone: "async-sorter__drop-zone",
  outputContainer: "async-sorter__output-container",
  runButton: "async-sorter__run-button",
};

export const STRING_CONSTANTS_ASYNC_SORTER_WIDGET = {
  asyncSorter: "Async Sorter",
  widgetDescription:
    "Place code blocks into Call Stack, Microtasks, and Macrotasks queues",
  consoleLog: "console.log",
  codeBlocks: "Code Blocks",
  callstackKey: "callstack",
  callstackValue: "Call Stack",
  microtasksKey: "microtasks",
  microtasksValue: "Microtasks",
  macrotasksKey: "macrotasks",
  macrotasksValue: "Macrotasks",
  sortableGroup: "asyncSorter",
  sortableGhostClass: "dragging",
  runButtonText: "Run",
  output: "Output",
  outputKey: "output",
};

export const NUMBER_CONSTANTS_ASYNC_SORTER_WIDGET = {
  sortableAnimation: 150,
  outputDelay: 400,
};

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
    classes: [CLASS_NAMES_ASYNC_SORTER_WIDGET.asyncSorterTitle],
    text: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.asyncSorter,
  }).getElement();

  new ParagraphCreator({
    parent: asyncSorterWidgetContainer,
    classes: [CLASS_NAMES_ASYNC_SORTER_WIDGET.widgetDescription],
    text: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.widgetDescription,
  });

  new HeadingsCreator(HEADINGS_THREE, {
    parent: asyncSorterWidgetContainer,
    text: payload.title,
  }).getElement();

  const codeContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_ASYNC_SORTER_WIDGET.codeContainer,
      CLASS_NAME.cardElement,
    ],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  const codeLines = payload.code.split("\n");
  const codeBlockValues: string[] = [];

  for (const codeLine of codeLines) {
    if (codeLine.includes(STRING_CONSTANTS_ASYNC_SORTER_WIDGET.consoleLog)) {
      const start =
        codeLine.indexOf(STRING_CONSTANTS_ASYNC_SORTER_WIDGET.consoleLog) +
        `${STRING_CONSTANTS_ASYNC_SORTER_WIDGET.consoleLog}(`.length +
        1;
      const end = codeLine.indexOf(")", start) - 1;
      let value = codeLine.slice(start, end);
      if (value === "") {
        value = codeLine.slice(start - 1, end + 1);
      }
      codeBlockValues.push(value);
    }
  }

  new PreCreator({
    parent: codeContainer,
    text: payload.code,
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: asyncSorterWidgetContainer,
    text: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.codeBlocks,
  }).getElement();

  const codeBlocksContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_ASYNC_SORTER_WIDGET.codeBlocksContainer,
      CLASS_NAME.cardElement,
    ],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  const codeBlockArr: HTMLElement[] = [];

  for (const value of codeBlockValues) {
    const codeBlock = new ElementCreator({
      parent: codeBlocksContainer,
      text: value,
      classes: [CLASS_NAMES_ASYNC_SORTER_WIDGET.codeBlock],
    }).getElement();

    codeBlockArr.push(codeBlock);
  }

  const bucketsContainer = new ElementCreator({
    classes: [CLASS_NAMES_ASYNC_SORTER_WIDGET.bucketsContainer],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  const bucketNamesMap = new Map<string, string>([
    [
      STRING_CONSTANTS_ASYNC_SORTER_WIDGET.callstackKey,
      STRING_CONSTANTS_ASYNC_SORTER_WIDGET.callstackValue,
    ],
    [
      STRING_CONSTANTS_ASYNC_SORTER_WIDGET.microtasksKey,
      STRING_CONSTANTS_ASYNC_SORTER_WIDGET.microtasksValue,
    ],
    [
      STRING_CONSTANTS_ASYNC_SORTER_WIDGET.macrotasksKey,
      STRING_CONSTANTS_ASYNC_SORTER_WIDGET.macrotasksValue,
    ],
  ]);

  const dropZones: HTMLElement[] = [];

  for (const [bucket, bucketName] of bucketNamesMap.entries()) {
    const bucketElement = new ElementCreator({
      parent: bucketsContainer,
      classes: [CLASS_NAMES_ASYNC_SORTER_WIDGET.bucket, CLASS_NAME.cardElement],
    }).getElement();

    if (bucketName) {
      new ParagraphCreator({
        parent: bucketElement,
        text: bucketName,
      }).getElement();
    }

    const dropZone = new ElementCreator({
      parent: bucketElement,
      classes: [CLASS_NAMES_ASYNC_SORTER_WIDGET.dropZone],
    }).getElement();

    dropZone.dataset.name = bucket;
    dropZones.push(dropZone);
  }

  Sortable.create(codeBlocksContainer, {
    group: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.sortableGroup,
    animation: NUMBER_CONSTANTS_ASYNC_SORTER_WIDGET.sortableAnimation,
    ghostClass: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.sortableGhostClass,
  });

  for (const dropZone of dropZones) {
    Sortable.create(dropZone, {
      group: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.sortableGroup,
      animation: NUMBER_CONSTANTS_ASYNC_SORTER_WIDGET.sortableAnimation,
      ghostClass: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.sortableGhostClass,
    });
  }

  const runButton = new ButtonCreator({
    text: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.runButtonText,
    classes: [CLASS_NAMES_ASYNC_SORTER_WIDGET.runButton, CLASS_NAME.button],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  new HeadingsCreator(HEADINGS_THREE, {
    parent: asyncSorterWidgetContainer,
    text: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.output,
  }).getElement();

  const outputContainer = new ElementCreator({
    classes: [
      CLASS_NAMES_ASYNC_SORTER_WIDGET.outputContainer,
      CLASS_NAME.cardElement,
    ],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  runButton.addEventListener(EVENT.click, () => {
    outputContainer.innerHTML = "";
    const output = getAnswer(dropZones).answer.at(-1)?.items;
    if (output) {
      void (async () => {
        for (const element of output) {
          await delay(NUMBER_CONSTANTS_ASYNC_SORTER_WIDGET.outputDelay);
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
    classes: [CLASS_NAMES_PRACTICE.submitButton, CLASS_NAME.button],
    parent: asyncSorterWidgetContainer,
  }).getElement();

  submitButton.addEventListener(EVENT.click, () => {
    onAnswer(getAnswer(dropZones));
    offButton(submitButton);
    offButton(runButton);
    for (const codeBlock of codeBlockArr) {
      codeBlock.classList.add(CLASS_NAME.noActive);
    }
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
  answer.push({
    name: STRING_CONSTANTS_ASYNC_SORTER_WIDGET.outputKey,
    items: output,
  });
  return { answer };
}
