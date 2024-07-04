import * as d3 from 'd3';
import System from "../services/System";
/*

Explicit functionnalities defined in canvas.controller.ts shall be implemented with 
D3 manipulation of the SVG canvas

-Panning
-Zooming
-...

*/

export class CanvasService {
    private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  
    constructor(svgElement: SVGSVGElement) {
      this.svg = d3.select(svgElement) || d3.select(System.canvas);
    }
  
    // Method to add an element to the canvas
    addElement(data: any) {
      this.svg
        .append('circle')
        .attr('cx', data.x)
        .attr('cy', data.y)
        .attr('r', data.radius)
        .attr('fill', data.color);
    }
  
    // Method to modify an element on the canvas
    modifyElement(id: string, newData: any) {
      this.svg
        .select(`#${id}`)
        .attr('cx', newData.x)
        .attr('cy', newData.y)
        .attr('r', newData.radius)
        .attr('fill', newData.color);
    }
  
    // Other methods to manipulate the canvas can be added here
  }
  
  export default CanvasService;