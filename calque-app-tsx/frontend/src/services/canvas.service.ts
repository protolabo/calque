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
  
  // Method to select an element only if it's nested in the <svg id="canvas"> tag
  selectCanvasElementById(selector: string) {
    // Select the svg element with id "canvas"
    const canvasSvg = d3.select('#canvas');

    // Check if the element is nested inside the canvasSvg
    const nestedElement = canvasSvg.select(selector);
    if (!nestedElement.empty()) {
      return nestedElement;
    } 
    else {
      return null;
    }
  }






  }
  
  export default CanvasService;