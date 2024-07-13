import React, { useState, useEffect } from "react";
import System from "../services/System"
import Node from "../models/node"
import labelStyle from "../components/Rightbar"

const  NameEditor : React.FC = () => {


  const [id, setId] = useState<string | null>(null); // State to hold the current ID

  useEffect(() => {
    const handleIdChange = (newId: string | null) => {
      if (newId) {
        setId(newId); // Update ID in state when focus changes to a node
      } else {
        setId(null); // Set ID to null when no node is focused
      }
    };

    System.on("focusChange", handleIdChange); // Listen for focusChange events

    return () => {
      System.off("focusChange", handleIdChange); // Clean up listener on component unmount
    };
  }, []); // Empty dependency array ensures useEffect runs only on mount and unmount


  
    //fetch the last interacted element 
    let  node :  Node | null = null;
    if (id){
      const entry = System.registry.get(id as unknown as number)
      if(entry instanceof Node){
        node = entry
      }
    }



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
