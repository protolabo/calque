import * as d3 from "d3"
import { Registry } from "./registry";
import { Node } from "../models/node";
import { Edge } from "../models/edge";
import { Ligne } from "../models/ligne";
import CanvasController from "./canvas.controller";
import System from "../services/System";
import { CircleStyle, EdgeStyle, Style } from "../models/style";

const registry: Registry = Registry.getInstance();

// select canvas g element
function canvas() {
    return d3.select("#canvas");
}

// Create node
export function createNode(x: number = 100, y: number = 100, fill: string = "orange"): void {
    const cssId: number = registry.createNode();
    const style = new CircleStyle;
    style.setAttribute("id",cssId.toString());
    style.setPosition(x,y);
    System.canvasController?.createShapeFromStyle(style);
    registry.updateNode({key:cssId,style:style});


}

// create edge
export function createEdge(idNode1: number, idNode2: number) { // TODO gérer la ligne
    const cssId = registry.createEdge(idNode1, idNode2, new Ligne("ligne " + idNode1.toString + "-" + idNode2.toString));
    const circle1 = d3.select("#" + idNode1.toString);
    const circle2 = d3.select("#" + idNode2.toString);
    const x1: number = circle1.attr("cx") as unknown as number;
    const x2: number = circle2.attr("cx") as unknown as number;
    const y1: number = circle1.attr("cy") as unknown as number;
    const y2: number = circle2.attr("cy") as unknown as number;

    let style: EdgeStyle = new EdgeStyle;
    style.d3Attributes["id"] = cssId;
    style.setLine(x1, y1, x2, y2);

    if (typeof cssId !== "undefined") {
        canvas().append("line")
                .attr("id", cssId)
    }
}

// update node
export function updateNode({id, name, newFill, newStroke, newStrokeWidth}: {
  id: number, 
  name?: string, 
  newFill?: string,
  newStroke?: string,
  newStrokeWidth?: number
}) {
    const node: Node = (registry.get(id) as Node);
    let style: Style = node.style;
    let attributes: {[key: string]: string | number} = {}; // TODO gérer l'élément sur le canvas

    if (typeof newFill !== "undefined") {
        attributes.fill = newFill;
    }
    if (typeof newStroke !== "undefined") {
        attributes.stroke = newStroke;
    }
    if (typeof newStrokeWidth !== "undefined") {
        attributes.strokeWidth = newStrokeWidth;
    }

    style.d3Attributes = {...style.d3Attributes, ...attributes}
    registry.updateNode({key:id, name:name, style:style}) // TODO finir ici
}

// delete node or edge
export function deleteElement(key: number) {
    const IDs: string[] = (registry.delete(key)).map((num) => "#" + num.toString);
    for (const id of IDs) {
        canvas().select(id)
                .remove;
    }
}

// get node or edge by id
export function getElement(key: number): Node | Edge | undefined {
    return registry.get(key);
}