import { Widget } from "../types/widget.type.js";

export interface BaseWidget {
  id: string;
  topicId: string;
  type: Widget;
  title: string;
}
