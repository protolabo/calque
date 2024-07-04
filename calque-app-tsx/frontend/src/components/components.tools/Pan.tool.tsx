import System from '../../services/System';
import { FaHandPaper } from "react-icons/fa";
import PanCommand from '../../commands/pan.command';
import { NbLeft, NbCompDrop, NbTitle } from '../Navbar';

const Pan: React.FC = () => {

    //We we trigger the button, we notify the system
    //We load the tool.command.ts so that we can trigger tool.command.execute() if needed
    const loadTool = () => {
        console.log("Pan tool (wired)")
        const panCommand = new PanCommand();
        System.activeTool=panCommand;
    };



    //TODO: CSS and AESTHETIC
    return (
      <button 
      id="PanTool" 
      className="w-100 h-100 bg-black bg-opacity-0 hover:bg-opacity-40"
      onClick={loadTool}
      >

            <NbCompDrop icon={FaHandPaper}>
                <div></div>
            </NbCompDrop>  

        

      </button>
    );
  
  };

  export default Pan;

