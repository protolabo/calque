import LogoIcon from "../../assets/Logo.asset";
import System from '../../services/System';
import {NbCompDrop} from '../Navbar';
//
//
//
//Remove the comment once wired to the system and its command
//
//
//
const Logo: React.FC = () => {

    //We we trigger the button, we notify the system
    //We load the tool.command.ts so that we can trigger tool.command.execute() if needed
    const onClickLogo = () => {
        console.log("Logo Icon Event") 
        //const panCommand = new PanCommand();
        //System.activeTool=panCommand;
    };



    //TODO: CSS and AESTHETIC
    return (
      <button 
      id="Logo" 
      className=""
      onClick={onClickLogo}
      >
        {/* Nest your Code at this level or at an even more nested level */}

            <NbCompDrop icon={LogoIcon}>
                <div></div>
            </NbCompDrop>  

        

      </button>
    );
  
  };

  export default Logo;

