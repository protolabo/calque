// PanCommand.ts
import {createNode} from "../controllers/component.controller";
import System from "../services/System";

class CreateEdgeCommand {

    execute() {
      console.log("Creating a Node");
      const mouseProperties = System.mouse
      //console.log(mouseProperties.offsetX)
      //console.log(mouseProperties.offsetY)
      //Works until here
      createNode(mouseProperties.offsetX,mouseProperties.offsetY)
    }
  }
  
  export default CreateEdgeCommand;
  