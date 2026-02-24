import { BaseWidget } from "../../interfaces/base-widget.interface.js";

export interface AsyncSorterWidget extends BaseWidget {
  type: "async-sorter";

  code: string;

  buckets: {
    name: "callstack" | "microtasks" | "macrotasks" | "output";
    correctItems: string[];
  }[];
}
