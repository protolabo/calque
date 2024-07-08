import React from "react"
import System from "../services/System"
import Node from "../models/node"
import labelStyle from "../components/Rightbar"

function PositionEditor() {
    //fetch the last interacted element 
    const node :  Node | null = System.focus instanceof Node? System.focus: null;
    
  return (
    <div id="PositionEditor" className="">   
      {/* Form will allow update upon posting */}
      <form>
        <label className="">  
            {/* dd */}
            <h5 id = "PositionEditor_PrefixText_PosX" className="block">   
                Position x :  
            </h5>
            <div id = "PositionEditor_Variable_PosX" className="inline">
              <input type="text" placeholder={node? (node.style.d3Attributes["x"]? node.style.d3Attributes["x"].toString() : "No value" ) : "No selection"} className=""></input>
            </div>
        </label>
        <label className="">  
            {/* dd */}
            <h5 id = "PositionEditor_PrefixText_PosY" className="block">   
                Position Y :  
            </h5>
            <div id = "PositionEditor_Variable_PosY" className="inline">
              <input type="text" placeholder={node? (node.style.d3Attributes["y"]? node.style.d3Attributes["y"].toString() : "No value" )  : "No selection"} className=""></input>
            </div>
        </label>


      </form>
    </div>
  );
}


export default PositionEditor;
