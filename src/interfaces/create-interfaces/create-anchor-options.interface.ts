import { CreateElementOptions } from "./create-element-options.interface";
export interface CreateAnchorOptions extends CreateElementOptions {
  href: string;
  target: string;
}
