import CanvasController from "../controllers/canvas.controller";
import System from "../services/System";
import {Style} from "../models/style.ts";
import Command from "./commandInterface.ts"



class CreateNodeCommand implements Command {
  private controller : CanvasController | null;
  private style : Style;

  constructor(){
    if(System.canvas){
      this.controller = new CanvasController(System.canvas)
      this.style = System.selectedStyle || System.defaultStyle;
    }
    else{
      this.controller=null;
      this.style = System.selectedStyle || System.defaultStyle;
    }
  }


  onLoad(){
    console.log("Add Node tool onLoad()")
    if(this.controller){
      this.controller.addNodeMode(this.style);
    }
    else{
      console.warn("Add Node command instantiated on no existing canvas.")
    }
  }



    execute() {
      if (this.controller){
        console.log("Creating a Node");
      }
      else{
        console.warn("Select command will fail without a canvas.")
      }
    }



    onLeave(){
      if(this.controller){
        this.controller.endAddShapeMode()
      }
    }
  
  }
  
  export default CreateNodeCommand;
  