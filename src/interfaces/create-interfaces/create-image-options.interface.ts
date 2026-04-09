import { CreateElementOptions } from "./create-element-options.interface.js";

export interface CreateImageOptions extends CreateElementOptions {
  src: string;
  alt: string;
}
