import React, { useState, useEffect } from "react";
import System from "../services/System"; // Import the System
import {Widget,StyleWidget} from "../widgets/customWidget";
import Node from "../models/node";
import Edge from "../models/node";
import StyleEditor from "./StyleEditor";



function NodeEditor() {

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
  

    if (!focus) {
      return null; // Return null if no node is focused
    }
  



    const nodeWidgets = [
      {name: "id"},
      {name: "name"}
  
    ];

  return (
  <div className="flex flex-col p-2 h-screen">

        <div id="NodeEditor">

          <div id="NodeEditor_Header">
                <h2>
                    Node Editor
                </h2>
          </div>
            
          <div id="NodeEditor_Widgets">
            {
            nodeWidgets.map(e => (
              <Widget 
              id = {focus}
              attributeName={ (e.name as (keyof Node|keyof Edge))}
              d3Attribute=""
            />))
            }
          </div>

        </div>
        
        <StyleEditor/>

  </div>
  )
}

export default NodeEditor;

