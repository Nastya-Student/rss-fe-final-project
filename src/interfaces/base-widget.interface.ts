import { WidgetType } from "../types/widget-type.type.js";

export interface BaseWidget<TPayload, TType extends WidgetType> {
  id: string;
  topicId: string;
  type: TType;
  difficulty: 1 | 2 | 3;
  tags: string[];
  payload: TPayload;
}
