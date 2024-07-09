import CanvasService from '../services/canvas.service';
import System from '../services/System';
import {Style, SelectionStyle} from "../models/style.ts";
import * as d3 from 'd3';
import {Edge} from '../models/edge';
import { Registry } from "./registry"
import { Ligne } from "../models/ligne"
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
    
const registry: Registry = Registry.getInstance();


class CanvasController {
  //attributes
  private svg : SVGSVGElement;
  //selection box
  private selectionRectangle: d3.Selection<SVGElement, unknown, null, undefined> | null = null;
  //selection style
  private selectionStyle : Style;
  //Controllers
  private canvasService: CanvasService;

  constructor(svgElement: SVGSVGElement) {
    this.svg = svgElement;
    this.canvasService = new CanvasService(svgElement) ;
    this.selectionStyle = new SelectionStyle();
  }









//           --Add Element Methods--





  // General method to create a shape
  createShape(shapeType: string, attributes: { [key: string]: any }) : d3.Selection<SVGElement, unknown, null, undefined> | null {
    if(d3Elements.includes(shapeType)){
        console.log(attributes)


        //If string is a real keyword, add the appropriate attribute
        const shape = this.canvasService.addShape(shapeType, attributes);
        return shape
    }
    return null
  }


  // General method to create a shape
  createShapeFromStyle(style:Style) : d3.Selection<SVGElement, unknown, null, undefined> | null {
    const shapeType = style.shapeName;
    const attributes = style.d3Attributes
    return this.createShape(shapeType,attributes)

  }

  // General method to create a shape
  createShapeFromStyleEvent(style:Style, event:any): d3.Selection<SVGElement, unknown, null, undefined> | null  {
    if(style && style.shapeName){
      if(d3Elements.includes(style.shapeName)){
        const [x,y] = d3.pointer(event)
        const shape = this.canvasService.addShapeAt(style.shapeName,style.d3Attributes,x,y)
        this.canvasService.draggable(shape)
        return shape
      }
    }
    return null
  }








  //        --Node Methods--


  addRegistryEntryNode() {
    const cssId: number = registry.createNode();
    console.log((cssId))
    return {"id":cssId}
  }  

  createNode(shapeType: string, attributes: { [key: string]: any }) {
    if(d3Elements.includes(shapeType)){
        //console.log(attributes)

        //If string is a real keyword, add the appropriate attribute
        const shape = this.canvasService.addShape(shapeType, attributes);
        this.addNodeBehaviors(shape)
    }
  }



  // General method to create a shape
  createNodeFromStyleEvent(style:Style, event:any): d3.Selection<SVGElement, unknown, null, undefined> | null  {
    //
      const id = this.addRegistryEntryNode()
      style.d3Attributes = {...style.d3Attributes, ...id }
      const selection  = this.createShapeFromStyleEvent(style,event)
      //
      if (selection) {
        this.addNodeBehaviors(selection)
        //console.log(selection.attr("id"))
        return selection
      }
      else {
        registry.delete(id.id)
        return null
      }
  }


  addNodeBehaviors(shape: d3.Selection<SVGElement, unknown, null, undefined>) {
    this.canvasService.draggable(shape);
    // this.canvasService.followable(shape);

  }


  
  public addNodeMode(style: Style): void {
    if (style) {
      this.selectionStyle = style; //Add a custom style if necessary
    }
    //select the d3 element
    const svgElement =  this.canvasService.selectCanvasElement(this.svg);
    //if canvas not null
    if (svgElement) {
      //add event listeners
      const eventListeners = {
        'mousedown': (event:any) => this.createNodeFromStyleEvent(style,event),
      }
    this.canvasService.addEventListeners(svgElement,eventListeners)
    }
  }











    //        --Edge Methods--








  createEdge(shapeType: string, attributes: { [key: string]: any }) {
    if(d3Elements.includes(shapeType)){
        console.log(attributes)

        /* TODO : Connect to the registry  */

        //If string is a real keyword, add the appropriate attribute
        const shape = this.canvasService.addShape(shapeType, attributes);
    }
  }





  addRegistryEntryEdge(key1: number, key2: number) {
    const cssId: number = registry.createEdge(key1, key2, new Ligne("nouvelle ligne"))!;
    console.log((cssId))
    return {"id":cssId}
  }  


  // // General method to create a shape
  // createEdgeFromStyleEvent(style:Style, key1:number, key2:number, event:any): d3.Selection<SVGElement, unknown, null, undefined> | null  {
  //   //
  //     const id = this.addRegistryEntryEdge(key1,key2)
  //     style.d3Attributes = {...style.d3Attributes, ...id }
  //     const selection  = this.createShapeFromStyle(style)
  //     //
  //     if (selection) {
  //       this.addEdgeBehaviors(selection)
  //       //console.log(selection.attr("id"))
  //       return selection
  //     }
  //     else {
  //       registry.delete(id.id)
  //       return null
  //     }
  // }




  /*
  addRegistryEntryEdge(key1: number, key2: number) {
    const cssId: number = registry.createEdge(key1, key2, new Ligne("nouvelle ligne"))!;
    console.log((cssId))
    return {"id":cssId}
  }  
*/


  addEdgeBehaviors(shape: d3.Selection<SVGElement, unknown, null, undefined>) {


  }


  
  public addEdgeMode(style: Style,): void {
    if (style) {
      this.selectionStyle = style; //Add a custom style if necessary
    }
    //select the d3 element
    const svgElement = this.canvasService.selectCanvasElement(this.svg);
    //if canvas not null
    if (svgElement) {
      //add event listeners
      
      
      
      let listEdges : string[] = (System.getNodeFromSelection())

      if(listEdges){
        //ok
        this.createEdgeFromSelection(style)
      }


      const eventListeners = {
        'mousedown': (event:any) => this.createEdgeFromSelection(style),
      }
    this.canvasService.addEventListeners(svgElement,eventListeners)
    }
  }



public createEdgeFromSelection( style: Style) {
  
    let listNode : string[] = (System.getNodeFromSelection());

    if (listNode.length === 0) {
      
    }
    else if(listNode.length === 1) {
      
    }
    else if(listNode.length >= 2){

    }
    else {
      console.warn(
        "What"
      )
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
      'mousedown': (event:any) => this.onMouseDownSelect(event),
      'mousemove': (event:any) => this.onMouseMoveSelect(event),
      'mouseup': (event:any) => this.onMouseUpSelect(event)
    }
    this.canvasService.addEventListeners(svgElement,eventListeners)
    }
  }

  private onMouseDownSelect(event: MouseEvent): void {
    this.selectionRectangle = this.createShapeFromStyleEvent(this.selectionStyle,event)
    const [x,y] = d3.pointer(event)
    this.selectionRectangle?.attr("originalX",x)
    this.selectionRectangle?.attr("originalY",y)
  }

  private onMouseMoveSelect(event: MouseEvent): void {
    //
    if (this.selectionRectangle) {
      //(x,y) is where the mouse is right now
      const [x, y] = d3.pointer(event);
      const width = (parseFloat(this.selectionRectangle.attr("originalX")) - x)
      const height = (parseFloat(this.selectionRectangle.attr("originalY")) - y)
      //
      this.canvasService.modifyElement(this.selectionRectangle,
        {
          'x': width < 0 ? x + width : x,
          'y': height < 0 ? y + height: y,
          'width': Math.abs(width),
          'height': Math.abs(height)
        })
      } 
  }

  private onMouseUpSelect(event: MouseEvent): void {
    if (this.selectionRectangle) {
      //Bouding box points
      const x = parseFloat(this.selectionRectangle.attr("x"))
      const y = parseFloat(this.selectionRectangle.attr("y"))
      const width = parseFloat(this.selectionRectangle.attr("width"))
      const height = parseFloat(this.selectionRectangle.attr("height"))
      const selection = this.canvasService.selectElementsInArea(x,y,x+width,y+height)
      console.log(selection)
      //
      var ids : string[] = []
      //
      if(selection){
        ids = this.canvasService.getIdFromSelected(selection)
      }
      console.log(ids)
      const focus = ids.slice(-1)[0] || null;
      //
      System.selection = ids;
      System.focus = focus;
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
