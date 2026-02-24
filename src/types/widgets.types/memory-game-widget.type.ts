import { BaseWidget } from "../../interfaces/base-widget.interface.js";

export interface MemoryGameWidget extends BaseWidget {
  type: "memory-game";

  codeSnippet: string;

  objects: {
    id: number;
    label: string;
  }[];

  links: {
    from: number;
    to: number;
  }[];

  garbageIds: number[];
}
