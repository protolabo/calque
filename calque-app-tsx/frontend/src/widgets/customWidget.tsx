import React, { useState, useEffect } from "react";
import System from '../services/System';
import Node from "../models/node"; 
import {Edge} from "../models/edge"; 
import { Style } from "../models/style";
//
//
//

interface WidgetInterface {
    id: string | null;
    attributeName: keyof Node | keyof Edge;
    d3Attribute: string;
  }
  

const Widget: React.FC<WidgetInterface> = ({id,attributeName,d3Attribute}) => {
    const [focus, setFocus] = useState<string>(System.focus||"");
    const [value, setValue] = useState<any>("");

  
    useEffect(() => {
  
      const handleFocusChange = (newFocus: string) => {
        setFocus(newFocus);
        updateElement(newFocus);
      };


      const updateElement = (newFocus: string) => {
        const id: string = newFocus;
        const element = System.registry.get(id);
        //console.log(element);
        if (element) {
          updateValue(element);
        }
      };
  
      const updateValue = (elementArg: Edge | Node) => {
        if ("type" in elementArg) { // Distinguishing Edge by checking for a unique property
          setValue( (elementArg[attributeName as keyof Edge].toString() || "") );
        } else {
          setValue( (elementArg[attributeName as keyof Node].toString() || "") );
        }
      };

  
      System.on("focusChange", handleFocusChange);
      return () => {
        System.off("focusChange", handleFocusChange);
      };
    }, [attributeName]); // Adding attributeName to the dependency array if it might change
  

    function updateRegistry(event:any){
      //
      if(id && attributeName && attributeName){
        //
        attributeName = attributeName as keyof Node
        const element = System.registry.updateNodeCustom(id,attributeName,event.target.value)
        //
        if(element && System.canvasController){
          System.canvasController.updateElementById(element.id,element.style)
        }
      }
    }


    return (
        <div>

            <label id="" htmlFor={`NodeEditor_${attributeName}_Input`} >  {`${attributeName} :`}  </label>

            <input 
            type = "text"
            id={`NodeEditor_${attributeName}_Input`}
            className=""
            placeholder={value||""}
            onChange={updateRegistry}
            >
                {/* Nest your Code at this level or at an even more nested level */}

            </input>
        </div>
        );
  
  };


  const StyleWidget: React.FC<WidgetInterface> = ({id,attributeName,d3Attribute}) => {

    const [focus, setFocus] = useState<string>("");
    const [value, setValue] = useState<string>("");
  




    useEffect(() => {
      const handleFocusChange = (newFocus: string) => {
        setFocus(newFocus);
        updateElement(newFocus);
      };
      
      //we listen to focus changes on the system
      const updateElement = (newFocus: string) => {
        const id: string = newFocus;
        console.log(id)
        const element = System.registry.get(id);
        //console.log(element);
        if (element) {
          //if the element is Node or Id, we can fetch the values for each d3 arg
          updateValue(element);
        }
      };
  
      const updateValue = (elementArg: Edge | Node) => {
        if ("type" in elementArg) { // Distinguishing Edge by checking for a unique property
          //value = edge.style[d3Attribute]
          setValue((elementArg[attributeName as keyof Edge].d3Attributes[d3Attribute].toString() || ""));
        } else {
          //print style
          //console.log(elementArg[attributeName as keyof Node])
          setValue((elementArg[attributeName as keyof Node].d3Attributes[d3Attribute].toString() || ""));
        }
      };
  
  
      System.on("focusChange", handleFocusChange);
      return () => {
        System.off("focusChange", handleFocusChange);
      };
    }, [d3Attribute]); // Adding attributeName to the dependency array if it might change
  

    function updateRegistry(event:any){
      //
      if(id && attributeName){
        //
        const element = System.registry.updateStyle(id,d3Attribute,event.target.value)
        if(element && System.canvasController){
          System.canvasController.updateElementById(element.id,element.style)
        }
      }
    }

    return (
        <div>

            <label id="" htmlFor={`StyleEditor_${d3Attribute}_Input`} >  {`${d3Attribute} :`}  </label>

            <input 
            type = "text"
            id={`StyleEditor_${d3Attribute}_Input`}
            className=""
            placeholder={value||""}
            onChange={updateRegistry}
            >
                {/* Nest your Code at this level or at an even more nested level */}

            </input>
        </div>
        );
  
  };

  
  export {Widget,StyleWidget};
