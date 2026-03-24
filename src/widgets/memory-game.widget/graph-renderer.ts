import { EVENT } from "../../constants";
import {
  MemoryGameLink,
  MemoryGameObject,
  MemoryGamePayload,
} from "../../interfaces/widget-payload.interfaces";
import { SVGGCreator } from "../../utils/svg-elements/svg-g/svg-g";
import { SVGLineCreator } from "../../utils/svg-elements/svg-line/svg-line";
import { SVGRectCreator } from "../../utils/svg-elements/svg-rect/svg-rect";
import { SVGTextCreator } from "../../utils/svg-elements/svg-text/svg-text";
import "./graph-renderer.css";

export class GraphRenderer {
  container: SVGSVGElement;
  objects: Map<string, SVGGElement> = new Map();
  links: SVGGElement[] = [];

  constructor(container: SVGSVGElement) {
    this.container = container;
  }

  render(data: MemoryGamePayload): void {
    this.container.innerHTML = "";
    this.objects.clear();
    this.links = [];

    const allLinks: MemoryGameLink[] = [...data.links, ...data.rootLinks];
    for (const link of allLinks) {
      const fromNode = data.objects.find((o) => o.id === link.from);
      const toNode = data.objects.find((o) => o.id === link.to);
      if (!fromNode || !toNode) {
        continue;
      }
      const linkNode = this.createLink(fromNode, toNode, link.label);
      this.container.append(linkNode);
      this.links.push(linkNode);
    }

    for (const obj of data.objects) {
      const node = this.createObjectNode(obj);
      this.container.append(node);
      this.objects.set(obj.id, node);
    }
  }

  private createObjectNode(obj: MemoryGameObject): SVGGElement {
    const g = new SVGGCreator({
      attributes: { transform: `translate(${obj.x}, ${obj.y})` },
    }).getElement();

    const rect = new SVGRectCreator({
      classes: ["memory-game__object-node"],
      parent: g,
    }).getElement();

    new SVGTextCreator({
      classes: ["memory-game__object-text"],
      parent: g,
      text: obj.label,
      attributes: { x: "60", y: "30" },
    }).getElement();

    g.addEventListener(EVENT.click, () => {
      this.toggleGarbageMark(rect);
    });
    return g;
  }

  private createLink(
    from: MemoryGameObject,
    to: MemoryGameObject,
    label?: string,
  ): SVGGElement {
    const g = new SVGGCreator({}).getElement();
    new SVGLineCreator({
      parent: g,
      classes: ["memory-game__object-link"],
      attributes: {
        x1: String(from.x + 120),
        y1: String(from.y + 25),
        x2: String(to.x),
        y2: String(to.y + 25),
      },
    }).getElement();

    if (label !== undefined) {
      new SVGTextCreator({
        parent: g,
        text: label,
        classes: ["memory-game__link-label"],
        attributes: {
          x: String((from.x + 120 + to.x) / 2),
          y: String((from.y + to.y + 50) / 2 - 5),
        },
      }).getElement();
    }

    return g;
  }

  toggleGarbageMark(rect: SVGRectElement): void {
    rect.classList.toggle("garbage");
  }
}
