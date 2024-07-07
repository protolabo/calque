import CanvasService from '../services/canvas.service';
import System from '../services/System';
import {Style, SelectionStyle} from "../models/style.ts";
import * as d3 from 'd3';
/*

Controller made for general manipulation of the canvas

Can be used for basic functionnalities such as:

-Panning
-Zooming
-...



*/
const d3Elements = [
    "a",
    "circle",
    "ellipse",
    "image",
    "line",
    "path",
    "polygon",
    "polyline",
    "rect",
    "text",
    "foreignObject",
    "g",
    "svg",
    "switch",
    "symbol",
    "use"]


class CanvasController {
  //attributes
  private svg : SVGSVGElement;
  private canvasService: CanvasService;
  //selection box
  private selectionRectangle: d3.Selection<SVGElement, unknown, null, undefined> | null = null;
  //selection style
  private selectionStyle : Style;

  constructor(svgElement: SVGSVGElement) {
    this.svg = svgElement;
    this.canvasService = new CanvasService(svgElement) ;
    this.selectionStyle = new SelectionStyle();
  }









//           --Generic Methods--





  // General method to create a shape
  createShape(shapeType: string, attributes: { [key: string]: any }) {
    if(d3Elements.includes(shapeType)){
        console.log(attributes)

        /* TODO : Connect to the registry  */

        //If string is a real keyword, add the appropriate attribute
        const shape = this.canvasService.addShape(shapeType, attributes);
        this.canvasService.draggable(shape)
    }
  }


  // General method to create a shape
  createShapeFromStyle(style:Style) {
    const shapeType = style.shapeName;
    const attributes = style.d3Attributes
    this.createShape(shapeType,attributes)
  }

  // General method to create a shape
  createShapeFromStyleEvent(style:Style, event:any) {
    if(d3Elements.includes(style.shapeName)){
      const [x,y] = d3.pointer(event)
      const shape = this.canvasService.addShapeAt(style.shapeName,style.d3Attributes,x,y)
      this.canvasService.draggable(shape)
    }
  }






  //        --Selection box--



  //adding all the event listeners on svg canvas (might induce conflict between event listeners)
  public selectMode(style : Style | null = null): void {
    if (style){
      this.selectionStyle=style; //Add a custom style if necessary
    }
    //select the d3 element
    const svgElement =  this.canvasService.selectCanvasElement(this.svg);
    //if not null
    if (svgElement){
    //add event listeners
    const eventListeners = {
      'mousedown': (event:any) => this.onMouseDown(event),
      'mousemove': (event:any) => this.onMouseMove(event),
      'mouseup': (event:any) => this.onMouseUp(event)
    }
    this.canvasService.addEventListeners(svgElement,eventListeners)
    }
  }

  private onMouseDown(event: MouseEvent): void {
    const [x, y] = d3.pointer(event); //get x and y by deconstruction
    this.selectionRectangle = this.canvasService.addShape("rect", {...this.selectionStyle.d3Attributes , ...{"x":x, "y":y}});

  }

  private onMouseMove(event: MouseEvent): void {
    if (this.selectionRectangle) {
      //end coordinates
      const [x, y] = d3.pointer(event);
      //start coordinates
      const [x0,y0] = [ parseFloat(this.selectionRectangle.attr('x')), parseFloat(this.selectionRectangle.attr('y'))]
      //
      this.canvasService.modifyElement(this.selectionRectangle,
        {
        width: Math.abs(x - x0),
        height: Math.abs(y - y0),
        x: Math.min(x, x0),
        y: Math.min(y, y0)
        })
      } 
  }

  private onMouseUp(event: MouseEvent): void {
    if (this.selectionRectangle) {
      const [x, y] = d3.pointer(event);

      // Get the rectangle's bounding box
      //const [x0,y0] = [ parseFloat(this.selectionRectangle.attr('x')), parseFloat(this.selectionRectangle.attr('y'))]
      //const selectedElements = this.canvasService.selectElementsInArea(bbox.x, bbox.y, bbox.x + bbox.width, bbox.y + bbox.height);

      // Do something with the selected elements
      //console.log(selectedElements);

      // Remove the rectangle after selection is complete
      this.selectionRectangle.remove();
      this.selectionRectangle = null;
    }
  }

  private removeEventListeners(): void {
    const svgElement = this.canvasService.selectElement(this.svg) as unknown as d3.Selection<SVGElement,unknown,null,unknown>;
    this.canvasService.removeEventListeners(svgElement, {
    'mousedown': null,
    'mousemove': null,
    'mouseup': null,
    'click':null
    });
  }



  public addShapeMode(style:Style){
    if (style){
      this.selectionStyle=style; //Add a custom style if necessary
    }
    //select the d3 element
    const svgElement =  this.canvasService.selectCanvasElement(this.svg);
    //if canvas not null
    if (svgElement){
    //add event listeners
    const eventListeners = {
      'mousedown': (event:any) => this.createShapeFromStyleEvent(style,event),
    }
    this.canvasService.addEventListeners(svgElement,eventListeners)
    }
  }

  public endAddShapeMode(){
    this.removeEventListeners;
  }


  public endSelectMode(){
    this.removeEventListeners;
  }



}

export default CanvasController;
