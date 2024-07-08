import * as d3 from 'd3';
import System from "../services/System";
/*

Explicit functionnalities defined in canvas.controller.ts shall be implemented with 
D3 manipulation of the SVG canvas


---------------------types------------------------------

#Hierachy of D3 types--

  ##Most generic :

    type BaseType = Element | EnterElement | Document | Window | null;

  ##Generic : 

    Element: Represents a generic DOM element that D3 can select or manipulate. This includes both SVG and HTML elements.

  ##Semi-Generic : 

    SVGElement
    HTMLElement

  ##SVGElement:

    SVGCircleElement
    SVGEllipseElement
    SVGRectElement
    SVGPathElement
    SVGTextElement
    SVGLineElement
    SVGPolygonElement
    SVGPolylineElement
    SVGImageElement
    SVGGroupElement (SVGGElement)
    SVGSVGElement (root <svg> element)




----------------------selections-------------------------

#Type of a d3 selection :

  d3.Selection<ElementType, ElementDatum, ParentType, ParentDatum>

  ##Element Type was discussed in the previous section

  ##Element Datum ...

      BaseType: A generic type representing any kind of DOM element. It's often used when the specific type of element is not known or varies.

      Specific Element Types: These are specific types of DOM elements like HTMLElement, SVGElement, SVGCircleElement, etc.

      Unknown: Used when the data type is not specified or can be of any type.

      Null/Undefined:  Indicates the absence of data or a parent element. 

  ##Parent Type
    
    Effects on Code & Parent-Dependent Operations:

    Some D3 operations are context-dependent and rely on the parent element. If the parent element is null or unspecified, these operations may not work as expected. 
    
    For example, appending new elements to a selection assumes a known parent element.

    When merging selections, the parent context can be important. If the parent is null, merging with other selections that have a parent might lead to unexpected results.

    Event Propagation: Event listeners may propagate up the DOM tree. Without a specified parent, handling events that depend on the parent context might be more challenging.

    Hierarchical selections, where you select child elements within a parent context, may be affected. Operations like .selectAll may not function as expected if the parent context is unclear.

  ##Parent Datum is discussed in the Element datum section



----------------------Element-------------------------

Element includes both HTMLElement and SVGElement

#Attributes of the Element class : (Accessed with elementObj.attr('attribute'))

  ##DOM Attributes:

    id: The ID attribute of the element.
    class: The class attribute of the element.
    style: The inline CSS styles applied to the element.
    title: The title attribute of the element.
    Custom data attributes (data-*), e.g., data-custom.

  ##Event Attributes:

    onclick, onmouseover, etc.: Event handlers bound to specific events.
    Other Standard Attributes:

  ##Element-specific attributes 
  
    such as href (for <a> tags), src (for <img> tags), etc.
  
  ##DOM Properties:

    textContent: The text content of the element.
    value: The value of form elements (e.g., <input>, <textarea>).
    checked: The checked state of checkboxes and radio buttons.
    disabled: The disabled state of form elements.
    offsetWidth, offsetHeight: The dimensions of the element including border and padding.
    clientWidth, clientHeight: The dimensions of the element excluding border and padding.
    offsetTop, offsetLeft: The position of the element relative to its offset parent.
    clientTop, clientLeft: The border width of the element.
    scrollWidth, scrollHeight: The dimensions of the element's scrollable content.
    scrollTop, scrollLeft: The scroll position of the element.
  
  ##Style Properties:

  Access to computed styles via window.getComputedStyle(element).
  Individual style properties such as color, fontSize, etc.


---------------------------------------------------------
*/

export class CanvasService {
    private svgElement : SVGSVGElement;
    private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  
    constructor(svgElement: SVGSVGElement) {
      this.svgElement = svgElement;
      this.svg = d3.select(svgElement) || d3.select(System.canvas);
      this.startDrag = this.startDrag.bind(this);
      this.getOffsets = this.getOffsets.bind(this);
    }




  //     --Selection Methods --

  //
  //
  // Select any element in the DOM by using the CSS id
  selectElementById(cssId:string) : d3.Selection<Element, unknown, Element, unknown> | null {
    //This can return both HTMLElement and SVGElement elements, which is why d3.BaseType = Element is chosen
    //
    const element = d3.select<Element,unknown>(`#${cssId}`);
    //
    if (!element.empty()) {
      return element;
    } 
    else {
      return null;
    }
  }


  //
  //
  // Select any element in the DOM by using the D3 element
  selectElement(d3Element:d3.BaseType) : d3.Selection<d3.BaseType, unknown, d3.BaseType, unknown> | null {
    // Check if the element is nested inside the canvasSvg
    const element = d3.select(d3Element);
    //
    if (!element.empty()) {
      return element;
    } 
    else {
      return null;
    }
  }

  //
  //
  // Method to select all elements by an array of IDs
  selectAllElementsByIds(idArray: string[]): d3.Selection<Element, unknown, Element, unknown> {
    // Create an empty selection to start with
    let elements : d3.Selection<Element, unknown, Element, unknown> = this.svg.selectAll<Element, unknown>('*').filter(() => false);
    //
    idArray.forEach(id => {
      const element = this.selectElementById(id);
      if (element) {
        // Merge the current element into the selection
        elements = elements.merge(element);
      }
    });
    //
    return elements;
  }

  //
  //
  // Method to select an element only if it's nested in the <svg id="canvas"> tag
  selectAllImmediateChildren(parentCssId : string, childrenTag: string) : d3.Selection<Element ,unknown, Element, unknown> | null{
    const parent = this.selectElementById(parentCssId)
    if (parent){
      // Check if the element is nested inside the canvasSvg
      const immediateChildren :  d3.Selection<Element ,unknown, Element, unknown>  = parent.selectAll<Element,unknown>(childrenTag).filter(function() {return this.parentNode === parent.node();})
      //
      if (!immediateChildren.empty()) {
        return immediateChildren;
      } 
      else {
        console.warn('No immediate children with the specified tag exist.')
        return null;
      }
    }
    else{
      console.warn('Parent does not exist.')
      return null;
    }
  }



  private defaultFilterFn (this: Element) : boolean {
    return true; // Include all elements
  }

  // Generalized method to select and filter elements
  public selectAllByFilter(
    parentCssId: string = "body", 
    childrenTag: string = "*", 
    filterFn: ((this: Element) => boolean) = this.defaultFilterFn    ) : d3.Selection<Element, unknown, Element, unknown> | null {
    //
    const parent = this.selectElementById(parentCssId);
    if (parent) {
      const filteredChildren: d3.Selection<Element, unknown, Element, unknown> = parent
        .selectAll<Element, unknown>(childrenTag)
        .filter(filterFn);
        //
      if (!filteredChildren.empty()) {
        return filteredChildren;
      } else {
        console.warn('No children matching the filter function exist.');
        return null;
      }
    } else {
      console.warn('Parent does not exist.');
      return null;
    }
  }









  //
  //
  // Method to select an element only if it's nested in the <svg id="canvas"> tag
  selectCanvasElementByTag(selector: string) : d3.Selection<SVGElement,unknown, null, undefined> | null{
    // Check if the element is nested inside the canvasSvg
    const nestedElement = this.svg.select<SVGElement>(selector);
    if (!nestedElement.empty()) {
      //
      return nestedElement;
    } 
    else {
      return null;
    }
  }


  //
  //
  // Method to select an element only if it's nested in the <svg id="canvas"> tag
  selectCanvasElementById(selector: string) : d3.Selection<SVGElement,unknown, null, undefined> | null{
    // Check if the element is nested inside the canvasSvg
    const nestedElement = this.svg.select<SVGElement>(`#${selector}`);
    if (!nestedElement.empty()) {
      //
      return nestedElement;
    } 
    else {
      return null;
    }
  }






  //
  //
  // Method to select an element only if it's nested in the <svg id="canvas"> tag
  selectCanvasElement(selector:SVGElement) : d3.Selection<SVGElement,unknown, null, undefined> | null {
    // Check if the element is nested inside the canvasSvg
    const nestedElement = d3.select(selector);
    //
    if (!nestedElement.empty()) {
      return nestedElement;
    } 
    else {
      return null;
    }
  }






  public selectElementsInArea(x_start: number, y_start: number, x_end: number, y_end: number): d3.Selection<Element, unknown, Element, undefined> {
    //
    const elements = this.svg.selectAll<Element, unknown>('*').filter(function () {
      const bbox = this.getBoundingClientRect(); //
      const withinX = bbox.left >= x_start && bbox.right <= x_end;
      const withinY = bbox.top >= y_start && bbox.bottom <= y_end;
      return withinX && withinY;
    });
    return elements;
  }










  //     --Drawing Methods --


  //
  //
  // General method to add a shape to the canvas at a specific x y location
  addShapeAt(shapeName: string, d3Attributes: { [key: string]: any }, x: number, y: number): d3.Selection<SVGElement, unknown, null, undefined> {
    // Create a copy of d3Attributes to avoid mutating the original object
    const attributes = { ...d3Attributes };
    // Determine which attributes to set based on the shape type
    switch (shapeName.toLowerCase()) {
        case 'circle':
            attributes.cx = x;
            attributes.cy = y;
            break;
        case 'rect':
        case 'polygon':
        case 'path':
            attributes.x = x;
            attributes.y = y;
            break;
        // Add more cases for other shapes as needed
        default:
            console.warn(`Shape ${shapeName} is not explicitly handled for positioning.`);
            break;
    }
    // Add the shape to the canvas with updated attributes
    return this.addShape(shapeName, attributes);
}


  //
  //
  // General method to add a shape to the canvas
  addShape(shape: string, attributes: { [key: string]: any }):  d3.Selection<SVGElement,unknown, null, undefined> {
    const shapeSelection = this.svg.append<SVGElement>(shape);
    // Adding all the custom attributes
    for (const [attr, value] of Object.entries(attributes)) {
      shapeSelection.attr(attr, value);
    }
    // Attach drag behavior to the shape
    return shapeSelection
  }






  //     --Dragging Methods and Event Handlers --




  //
  //
  // Method to setup the drag behavior
  //allows us to add a drag behavior to pretty much every d3 element
  public draggable(shapeSelection: d3.Selection<SVGElement, unknown, null, undefined>) {

    const drag = d3.drag<SVGElement, unknown>()
      .on('start', this.startDrag)
      .on('drag', this.drag)
      .on('end', this.endDrag);

    shapeSelection.call(drag);
  }


  //
  //
  //
  private startDrag(event: d3.D3DragEvent<SVGElement, unknown, unknown>) {
    //_<Target Element Type, Datum, Container Type = parent-ish for event propagation>
    //Select the target
    const target = d3.select(event.sourceEvent.target as SVGElement);
    //Selection behavior, to be removed when properly implemented
    target.raise().attr('stroke', 'black');
    //
    // Calculate the offset between the mouse position and the shape's position
    const [offsetX, offsetY] = this.getOffsets(target, event);
    console.log([offsetX,offsetY])
    target.attr('data-offset-x', offsetX);
    target.attr('data-offset-y', offsetY);
    target.attr("drag",true)
  }



  //
  //
  // Method to handle dragging
  private drag(event: d3.D3DragEvent<SVGElement, unknown, unknown>) {
    // Select the target element being dragged
    const target = d3.select(event.sourceEvent.target as SVGElement);
    //Avoids grabbing the wrong target
    if(target.attr("drag")){
      // Retrieve the offset values from the element's attributes
      const offsetX = parseFloat(target.attr('data-offset-x') || '0');
      const offsetY = parseFloat(target.attr('data-offset-y') || '0');
  
      // Check if the element has a 'cx' attribute (likely a circle or ellipse)
      if (target.attr('cx')) {
        // Update the 'cx' and 'cy' attributes based on the drag event's position minus the offset
        target.attr('cx', event.x - offsetX).attr('cy', event.y - offsetY);
      } 
      else if (target.attr('x')) {
        // If the element has an 'x' attribute (likely a rect or text)
        // Update the 'x' and 'y' attributes based on the drag event's position minus the offset
        target.attr('x', event.x - offsetX).attr('y', event.y - offsetY);
      } 
      else if (target.node()?.nodeName === 'path') {
        // If the element is a path, call the movePath method
        this.movePath(target, event.x - offsetX, event.y - offsetY);
      } 
      else if (target.node()?.nodeName === 'polyline' || target.node()?.nodeName === 'polygon') {
        // If the element is a polyline or polygon, call the movePolylineOrPolygon method
        this.movePolylineOrPolygon(target, event.x - offsetX, event.y - offsetY);
      } 
      else if (target.node()?.nodeName === 'text') {
        // If the element is a text element, update the 'x' and 'y' attributes based on the drag event's position minus the offset
        target.attr('x', event.x - offsetX).attr('y', event.y - offsetY);
      }
    }
  }
  

  //
  //
  // Method to handle the end of dragging
  private endDrag(event: d3.D3DragEvent<SVGElement, unknown, unknown>) {
    const target = d3.select(event.sourceEvent.target as SVGElement)
    //end of selection
    target.attr('stroke', null);
    target.attr("drag",null)
  }



  //
  //
  // Method to calculate offsets
  private getOffsets(target: d3.Selection<SVGElement, unknown, null, undefined>, event: d3.D3DragEvent<SVGElement, unknown, unknown>) {
    //parameter 1 = d3 target
    //parameter 2 = d3 event
    const nodeName = target.node()?.nodeName || '';
    //
    if (nodeName === 'circle' || nodeName === 'ellipse') { //only 2 shapes use cx cy
      return [event.x - parseFloat(target.attr('cx') || '0'), event.y - parseFloat(target.attr('cy') || '0')];
    } 
    else if (nodeName === 'rect' || nodeName === 'text' || nodeName === 'image') { //for offset of a squareish shape
      return [event.x - parseFloat(target.attr('x') || '0'), event.y - parseFloat(target.attr('y') || '0')];
    } 
    else {
      return [event.x, event.y]; // Default fallback
    }
  }


  //
  //
  // Method to move paths
  private movePath(target: d3.Selection<SVGElement, unknown, null, undefined>, x: number, y: number) {
    const d = target.attr('d');
    // Parse the path and adjust its coordinates here
    // This is an example and may need adjustment based on your exact requirements
    const newD = d.replace(/M\s*([-\d.]+)\s*,\s*([-\d.]+)/g, (match, mx, my) => {
      const newMx = parseFloat(mx) + x;
      const newMy = parseFloat(my) + y;
      return `M${newMx},${newMy}`;
    });
    target.attr('d', newD);
  }


  //
  //
  // Method to move polylines and polygons
  private movePolylineOrPolygon(target: d3.Selection<SVGElement, unknown, null, undefined>, x: number, y: number) {
    const points = target.attr('points');
    const newPoints = points.split(' ').map(point => {
      const [px, py] = point.split(',');
      const newPx = parseFloat(px) + x;
      const newPy = parseFloat(py) + y;
      return `${newPx},${newPy}`;
    }).join(' ');
    target.attr('points', newPoints);
  }
  

  //
  //
  // Method to modify an element on the canvas
  public modifyElement(shapeSelection: d3.Selection<SVGElement, unknown, null, undefined>, attributes: { [key: string]: any }) {
      // Adding all the custom attributes
      for (const [attr, value] of Object.entries(attributes)) {
        shapeSelection.attr(attr, value);
      }
      return shapeSelection
    }





  //     --Adding / Removing Event Listeners --



  //
  //
  //Generalized way to add event listeners to a selected Element
  public addEventListeners(shapeSelection: d3.Selection<SVGElement, unknown, null, undefined>, eventListeners: { [key: string]: (event: any) => void }):  d3.Selection<SVGElement, unknown, null, undefined> {
    for (const [event, eventHandler] of Object.entries(eventListeners)) {
      if (typeof eventHandler ==='function'){
        shapeSelection.on(event,eventHandler)
      }
      else{
        console.warn(event + " was provided an eventHandler that is not a function")
      }
    }
    return shapeSelection
  }


  
  //
  //
  //Generalized way to remove event listeners to a selected Element
  public removeEventListeners(shapeSelection: d3.Selection<SVGElement, unknown, null, undefined>, eventListeners: { [key: string]: null }):  d3.Selection<SVGElement, unknown, null, undefined> {
    for (const [event, eventHandler] of Object.entries(eventListeners)) {
        shapeSelection.on(event,null)
    }
    return shapeSelection
  }





  //     --  Manipulating a selction  --


  public getIdFromSelected(selection: d3.Selection<Element, unknown, Element, unknown>) : string[]{
    const cssIds : string[] = []
    //we select the id attribute from the this Element object
    selection.each( function(){  cssIds.push(d3.select(this).attr("id"))  }  );
    //
    return cssIds
  }



}
  
  export default CanvasService;