import React from "react"
import System from "../services/System"
import Node from "../models/node"
import labelStyle from "../components/Rightbar"

function NameEditor() {
    //fetch the last interacted element 
    const node :  Node = System.focus;
    
  return (
    <div id="IdViewer" className="">   
      {/* Form will allow update upon posting */}
      <form>
        <label className="">  
            {/* dd */}
            <h5 id = "NameEditor_PrefixText" className="block">   
                Name :  
            </h5>
            <div id = "NameEditor_Variable" className="inline">
              <input type="text" placeholder={node? node.name : "No selection"} className=""></input>
            </div>
        </label>
      </form>
    </div>
  );
}


export default NameEditor;
