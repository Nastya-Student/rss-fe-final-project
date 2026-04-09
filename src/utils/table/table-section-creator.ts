import { CreateTableSectionOptions } from "../../interfaces/create-interfaces/create-table-section-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class TableSectionCreator extends ElementCreator {
  constructor(options: CreateTableSectionOptions) {
    super({ ...options, tag: options.section });
  }

  public getElement(): HTMLTableSectionElement {
    if (this.element instanceof HTMLTableSectionElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLTableSectionElement");
  }
}
