import { CLASS_NAME, EVENT } from "../../constants";
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
import {
  CLASS_NAMES_MEMORY_GAME_WIDGET,
  STRING_CONSTANTS_MEMORY_GAME_WIDGET,
} from "./memory-game.widget";

export class GraphRenderer {
  container: SVGSVGElement;
  objects: Map<string, SVGGElement> = new Map();
  links: SVGGElement[] = [];
  userAnswers: Set<string> = new Set();

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
      classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.gameObject],
    }).getElement();

    const rect = new SVGRectCreator({
      classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.gameObjectNode],
      parent: g,
    }).getElement();

    new SVGTextCreator({
      classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.gameObjectText],
      parent: g,
      text: obj.label,
      attributes: {
        x: STRING_CONSTANTS_MEMORY_GAME_WIDGET.gameObjectTextX,
        y: STRING_CONSTANTS_MEMORY_GAME_WIDGET.gameObjectTextY,
      },
    }).getElement();

    g.addEventListener(EVENT.click, () => {
      this.toggleGarbageMark(rect);
      if (this.userAnswers.has(obj.id)) {
        this.userAnswers.delete(obj.id);
      } else {
        this.userAnswers.add(obj.id);
      }
    });
    return g;
  }

  private createLink(
    from: MemoryGameObject,
    to: MemoryGameObject,
    label?: string,
  ): SVGGElement {
    const g = new SVGGCreator({
      classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.gameObjectsLink],
    }).getElement();
    new SVGLineCreator({
      parent: g,
      classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.gameObjectsLinkLine],
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
        classes: [CLASS_NAMES_MEMORY_GAME_WIDGET.gameObjectsLinkLabel],
        attributes: {
          x: String((from.x + 120 + to.x) / 2),
          y: String((from.y + to.y + 50) / 2 - 5),
        },
      }).getElement();
    }

    return g;
  }

  toggleGarbageMark(rect: SVGRectElement): void {
    rect.classList.toggle(CLASS_NAMES_MEMORY_GAME_WIDGET.gameGarbage);
  }

  disableInteractiveElements(): void {
    for (const svgElement of this.objects.values()) {
      svgElement.classList.add(CLASS_NAME.noActive);
    }
    for (const link of this.links) {
      link.classList.add(CLASS_NAME.noActive);
    }
  }
}
