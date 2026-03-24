export interface CreateSvgElementOptions {
  tag?: string;
  text?: string;
  classes?: string[];
  parent?: SVGElement;
  attributes?: Record<string, string>;
}
