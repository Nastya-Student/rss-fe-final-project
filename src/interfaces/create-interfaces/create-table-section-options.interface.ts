import { CreateElementOptions } from "./create-element-options.interface.js";

export interface CreateTableSectionOptions extends CreateElementOptions {
  section: "thead" | "tbody" | "tfoot";
}
