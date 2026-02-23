import { CreateElementOptions } from "./create-element-options.interface.js";

export interface CreateProgressOptions extends CreateElementOptions {
  value: number;
  max: number;
}
