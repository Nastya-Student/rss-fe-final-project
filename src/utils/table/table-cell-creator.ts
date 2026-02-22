import { CreateTableCellOptions } from "../../interfaces/create-interfaces/create-table-cell-options.interface.js";
import ElementCreator from "../element-creator.js";

export default class TableCellCreator extends ElementCreator {
  constructor(options: CreateTableCellOptions) {
    super({
      ...options,
      tag: options.cellType ?? "td",
    });
  }

  public getElement(): HTMLTableCellElement {
    if (this.element instanceof HTMLTableCellElement) {
      return this.element;
    }
    throw new Error("Element is not HTMLTableCellElement");
  }
}
