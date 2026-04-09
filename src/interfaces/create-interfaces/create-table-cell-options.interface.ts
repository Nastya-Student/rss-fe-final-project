import { CreateElementOptions } from "./create-element-options.interface.js";

export interface CreateTableCellOptions extends CreateElementOptions {
  cellType?: "td" | "th";
}
