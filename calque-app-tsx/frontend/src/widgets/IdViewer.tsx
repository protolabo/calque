import React from "react"
import System from "../services/System"
import Node from "../models/node.ts"


function IdViewer() {
    //fetch the last interacted element 
    const node :  Node = System.focus;
    
  return (
    <div id="IdViewer" className="">   
        <h6 id = "IdViewer_PrefixText" className="inline">   
            Id :  
        </h6>
        <div id = "IdViewer_Variable" className="inline"> 
            {node? node.id : "No selection"}
        </div>
    </div>
  );
}

export default IdViewer;
