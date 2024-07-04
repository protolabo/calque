import { VscCircleLargeFilled } from "react-icons/vsc";
import System from '../../services/System';
import {NbCompDrop} from '../Navbar';
//
//
//
//Remove the comment once wired to the system and its command
//
//
//
const CreateNode: React.FC = () => {

    //We we trigger the button, we notify the system
    //We load the tool.command.ts so that we can trigger tool.command.execute() if needed
    const loadTool = () => {
        console.log("Create Node Tool (unwired)") 
        //const panCommand = new PanCommand();
        //System.activeTool=panCommand;
    };



    //TODO: CSS and AESTHETIC
    return (
      <button 
      id="CreateNode" 
      className=""
      onClick={loadTool}
      >
        {/* Nest your Code at this level or at an even more nested level */}

            <NbCompDrop icon={VscCircleLargeFilled}>
                <div></div>
            </NbCompDrop>  

        

      </button>
    );
  
  };

  export default CreateNode;

