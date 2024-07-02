import * as d3 from "d3"
import { Dictionnaire } from "./dictionnaire";

const registre: Dictionnaire = Dictionnaire.getInstance();

// Create node
export function createNode(x: number = 100, y: number = 100, fill: string = "orange"): void {
    const id: number = registre.createNode();
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
              .on('end', (e: any) => registre.updateNode({key:id, posX:e.x, posY:e.y})));
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

