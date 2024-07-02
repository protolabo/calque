import * as d3 from "d3"
import { Registry } from "./registry";
import { Node } from "../models/node";
import { Edge } from "../models/edge";

const registry: Registry = Registry.getInstance();

// Create node
export function createNode(x: number = 100, y: number = 100, fill: string = "orange"): void {
    const id: number = registry.createNode();
    d3.select("#canvas")
      .select("g")
      .append("circle")
      .attr("id", id)
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 20)
      .attr("fill", fill)
      .call(d3.drag<SVGCircleElement, any>()
              .on('drag', handleDrag)
              .on('end', (e: any) => registry.updateNode({key:id, posX:e.x, posY:e.y})));
}

function handleDrag(e: any, d: any) {
    d3.select(d)
      .attr("cx", e.x)
      .attr("cy", e.y)
}

// create edge
export function createEdge() {}

// delete node
export function deleteNode() {}

// delete edge
export function deleteEdge() {}

// get node or edge by id
export function getElement(key: number): Node | Edge | undefined {
    return registry.get(key);
}