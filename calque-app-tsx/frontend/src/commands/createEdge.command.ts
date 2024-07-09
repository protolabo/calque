import Command from "./commandInterface.ts"
import System from "../services/System";
import { Style } from "../models/style.ts";

class CreateEdgeCommand implements Command  {
  private style : Style;

  constructor(){
    if(System.canvas){
      this.style = System.selectedStyle || System.defaultEdgeStyle;
    }
    else{
      this.style = System.selectedStyle || System.defaultEdgeStyle;
    }
  }


  onLoad(){
    console.log("Add Node tool onLoad()")
    if(System.canvasController){
      System.canvasController.addEdgeMode(this.style);
    }
    else{
      console.warn("Add Edge command instantiated on no existing canvas.")
    }
  }



    execute() {
      if (System.canvasController){
        console.log("Creating an Edge");
      }
      else{
        console.warn("Create Edge command will fail without a canvas.")
      }
    }



    onLeave(){
      if(System.canvasController){
        System.canvasController.endAddShapeMode()
      }
    }
  
  }
  
  
  export default CreateEdgeCommand;
  