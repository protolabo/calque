import CanvasController from "../controllers/canvas.controller";
import System from "../services/System";
import {Style,SelectionStyle} from "../models/style.ts";
import Command from "./commandInterface.ts"



class SelectCommand implements Command {
  private controller : CanvasController | null;

  constructor(){
    if(System.canvas){
      this.controller = new CanvasController(System.canvas)
    }
    else{
      this.controller=null;
    }
  }



  onLoad(){
    console.log("Selection tool onLoad()")
    if (this.controller) {
      this.controller.selectMode();
    }
    else {
      console.warn("Select command instantiated on no existing canvas.")
    }
  }


    // Add any properties or methods needed for the PanCommand
  execute() {
      if (this.controller){
        console.log("Selecting elements");
      }
      else {
        console.warn("Select command will fail without a canvas.")
      }
    }

  onLeave() {
    if (this.controller) {
      this.controller.endSelectMode();
    }
  }

}
  export default SelectCommand;
  