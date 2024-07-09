import React from "react"
import System from "../services/System"
import Node from "../models/node.ts"


function IdViewer() {
    //fetch the last interacted element 
  const id = (System.focus?(System.registry.get(System.focus as unknown as number) instanceof Node? System.focus : null ): null)
    
  return (
    <div id="IdViewer" className="">   
        <h6 id = "IdViewer_PrefixText" className="inline">   
            Id :  
        </h6>
        <div id = "IdViewer_Variable" className="inline"> 
            {id? id : "No selection"}
        </div>
    </div>
  );
}

export default IdViewer;
