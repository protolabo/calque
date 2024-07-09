import Command from "./commandInterface.ts"
import System from "../services/System";
import { Style } from "../models/style.ts";
import CanvasController from "../controllers/canvas.controller.ts";

class CreateEdgeCommand implements Command  {
  private controller : CanvasController | null;
  private style : Style;

  constructor(){
    if(System.canvas){
      this.controller = new CanvasController(System.canvas);
      this.style = System.selectedStyle || System.defaultEdgeStyle;
    }
    else{
      this.controller = null;
      this.style = System.selectedStyle || System.defaultEdgeStyle;
    }
  }


  onLoad(){
    console.log("Add Edge tool onLoad()")
    if(this.controller){
      console.log("test 1")
      this.controller.addEdgeMode(this.style);
      console.log("test 2")
    }
    else{
      console.warn("Add Edge command instantiated on no existing canvas.")
    }
  }



    execute() {
      if (this.controller){
        console.log("Creating an Edge");
      }
      else {
        console.warn("Create Edge command will fail without a canvas.")
      }
    }



    onLeave() {
      if (this.controller) {
        this.controller.endAddShapeMode()
      }
    }
  
  }
  
  
  export default CreateEdgeCommand;
  