import Command from "./commandInterface.ts"
import {createNode} from "../controllers/component.controller";
import System from "../services/System";

class CreateEdgeCommand implements Command  {



  onLoad(){
    console.log("onLoad")
  }



    execute() {
      console.log("Creating a Node");
      const mouseProperties = System.mouse
      //console.log(mouseProperties.offsetX)
      //console.log(mouseProperties.offsetY)
      //Works until here
      createNode(mouseProperties.offsetX,mouseProperties.offsetY)
    }



    onLeave(){
      console.log("onLeave")
    }




  }
  
  export default CreateEdgeCommand;
  