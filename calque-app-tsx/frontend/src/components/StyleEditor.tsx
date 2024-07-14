import React, { useState, useEffect } from "react";
import System from "../services/System"; // Import the System
import {Widget,StyleWidget} from "../widgets/customWidget";
import Node from "../models/node";
import Edge from "../models/node";



function StyleEditor() {

/*
Note1: setFocus is a react hook
Note2: focus is our focused id

*/
    const [focus, setFocus] = useState<string | null>( System.focus );


    //useEffect hook is called upon rerending and upon dependency array [] modification
    useEffect(() => {

    //assumes the triggering event is focusChange (System.focus will emit("focusChange", value))
      const handleFocusChange = (newFocus: string) => {
        //new focus is the value
        setFocus(newFocus);
        
      };
  
      //suscribing to the event "focusChange" and associating the consequence handleFocusChange
      System.on("focusChange", handleFocusChange);
  
      return () => {
        System.off("focusChange", handleFocusChange);
      };
    }, []);
  


    const nodeWidgets = [
      {name: "id"},
      {name: "name"}
  
    ];
  
    const styleWidgets = [
      //{name: "cx"},
      //{name: "cy"},
      {name: "fill"},
      {name: "r"},
      
    ];
  


  return (
  <div id="StyleEditor">

        <div id="StyleEditor_Header">
                <h2>
                    Style Editor
                </h2>
          </div>
            

          <div id="StyleEditor_Widgets">
            {
            styleWidgets.map(e => (
              <StyleWidget 
              id = {focus}
              attributeName="style"
              d3Attribute={e.name}
            />))
            }
          </div>

  </div>
  )
}

export default StyleEditor;


/*

Common SVG Attributes for SVGGraphicsElement

x: The x-coordinate of the element. d3.select('rect').attr('x', 50);
y: The y-coordinate of the element. d3.select('rect').attr('y', 50);
width: The width of the element. d3.select('rect').attr('width', 100);
height: The height of the element. d3.select('rect').attr('height', 200);
rx: The x-axis radius for rounded corners (for rect). d3.select('rect').attr('rx', 10);
ry: The y-axis radius for rounded corners (for rect). d3.select('rect').attr('ry', 10);
cx: The x-coordinate of the center (for circle and ellipse). d3.select('circle').attr('cx', 50);
cy: The y-coordinate of the center (for circle and ellipse). d3.select('circle').attr('cy', 50);
r: The radius (for circle). d3.select('circle').attr('r', 30);
rx: The x-axis radius (for ellipse). d3.select('ellipse').attr('rx', 50);
ry: The y-axis radius (for ellipse). d3.select('ellipse').attr('ry', 30);
x1: The x-coordinate of the start of the line (for line). d3.select('line').attr('x1', 0);
y1: The y-coordinate of the start of the line (for line). d3.select('line').attr('y1', 0);
x2: The x-coordinate of the end of the line (for line). d3.select('line').attr('x2', 100);
y2: The y-coordinate of the end of the line (for line). d3.select('line').attr('y2', 100);
points: A list of points (for polyline and polygon). d3.select('polyline').attr('points', '0,0 50,50 100,0');
d: The path data (for path). d3.select('path').attr('d', 'M10 10 H 90 V 90 H 10 L 10 10');
text-anchor: The alignment of the text element (for text). d3.select('text').attr('text-anchor', 'middle');
font-family: The font family for the text (for text). d3.select('text').attr('font-family', 'Arial');
font-size: The font size for the text (for text). d3.select('text').attr('font-size', '16px');


Common Styling Attributes

fill: The fill color. d3.select('rect').attr('fill', 'blue');
fill-opacity: The opacity of the fill color. d3.select('rect').attr('fill-opacity', 0.5);
stroke: The color of the stroke (outline). d3.select('rect').attr('stroke', 'black');
stroke-width: The width of the stroke. d3.select('rect').attr('stroke-width', 2);
stroke-linecap: The shape of the ends of the stroke. d3.select('line').attr('stroke-linecap', 'round');
stroke-linejoin: The shape of the joints between stroke segments. d3.select('polyline').attr('stroke-linejoin', 'round');
stroke-opacity: The opacity of the stroke. d3.select('rect').attr('stroke-opacity', 0.7);


Event Handling Attributes

onclick: The action to take when the element is clicked. d3.select('rect').attr('onclick', 'alert("Rectangle clicked!")');
onmouseover: The action to take when the mouse is over the element. d3.select('rect').attr('onmouseover', 'alert("Mouse over rectangle!")');
onmouseout: The action to take when the mouse leaves the element. d3.select('rect').attr('onmouseout', 'alert("Mouse left rectangle!")');
onmousedown: The action to take when a mouse button is pressed on the element. d3.select('rect').attr('onmousedown', 'alert("Mouse button down on rectangle!")');
onmouseup: The action to take when a mouse button is released over the element. d3.select('rect').attr('onmouseup', 'alert("Mouse button up on rectangle!")');


Methods in D3 Selection for SVGGraphicsElement

attr(name, [value]): Get or set an attribute on the selected element(s). d3.select('circle').attr('r', 20);
style(name, [value]): Get or set a CSS style property on the selected element(s). d3.select('rect').style('fill', 'red');
property(name, [value]): Get or set a property on the selected element(s). d3.select('input').property('checked', true);
classed(name, [value]): Add or remove a class on the selected element(s). d3.select('rect').classed('highlight', true);
text([value]): Get or set the text content of the selected element(s). d3.select('text').text('Hello D3');
html([value]): Get or set the inner HTML of the selected element(s). d3.select('div').html('<strong>Bold Text</strong>');
append(type): Append a new child element of the specified type. d3.select('svg').append('circle');
insert(type, before): Insert a new child element of the specified type before another element. d3.select('svg').insert('rect', 'circle');
remove(): Remove the selected element(s). d3.select('circle').remove();
data([values, key]): Join the specified array of data with the selected elements. d3.selectAll('rect').data([10, 20, 30]);
datum([value]): Get or set the bound data for each selected element. d3.select('circle').datum(25);
filter(selector): Filter the selection to include only elements that match the selector. d3.selectAll('rect').filter('.active');
sort(comparator): Sort the selection according to the comparator function. d3.selectAll('rect').sort((a, b) => a - b);
order(): Reorder the document elements to match the selection order. d3.selectAll('rect').order();
call(function): Call a function with the selection as the context. d3.select('rect').call(console.log);
empty(): Check if the selection is empty. d3.selectAll('circle').empty();
node(): Get the first (non-null) node in the selection. d3.select('rect').node();
size(): Get the total number of elements in the selection. d3.selectAll('circle').size();
each(function): Invoke the specified function for each selected element. d3.selectAll('rect').each(function(d, i) { console.log(i, d); });

*/