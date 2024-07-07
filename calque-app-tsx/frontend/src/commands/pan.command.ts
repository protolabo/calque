import Command from "./commandInterface.ts"
// PanCommand.ts
class PanCommand implements Command  {


  onLoad(){
    console.log("onLoad")
  }



    execute() {
      console.log("Pan tool activated");
    }





    onLeave(){
      console.log("onLeave")
    }


  }
  
  export default PanCommand;
  