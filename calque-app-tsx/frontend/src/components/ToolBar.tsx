import React from 'react';
import { useState,useEffect } from 'react';
import Command  from "./../commands/commandInterface";
import SelectCommand  from "./../commands/select.command";

//icons
import {   VscCircleLargeFilled} from "react-icons/vsc";
import { FaHandPaper } from "react-icons/fa";
import Edge from "./../assets/Edge.asset";
import { RiCursorFill } from "react-icons/ri";
//General components
import System from './../services/System';
import {NbCompDrop} from './Navbar';
//Commands
import PanCommand  from "./../commands/pan.command";
import CreateEdgeCommand  from "./../commands/createEdge.command";
import CreateNodeCommand  from "./../commands/createNode.command";
//All tool components:
import Logo from "./components.tools/Logo.tool";



const ToolBar : React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>("Select");

  const tools = [
    {name: "Select", Command:SelectCommand, Icon: RiCursorFill},
    {name: "CreateNode", Command:CreateNodeCommand, Icon: VscCircleLargeFilled},
    {name: "CreateEdge" , Command:CreateEdgeCommand, Icon: Edge},
    {name: "Pan", Command:PanCommand, Icon: FaHandPaper},

  ];


  return (
    <div className='flex items-center justify-between'>
      {tools.map(tool => (
        <ToolIcon
        key={tool.name}
        toolName={tool.name}
        Command={tool.Command}
        ReactIcon={tool.Icon}
        active={activeTool === tool.name}
        onClick={()=>setActiveTool(tool.name)}
        />
      ))}
    
    </div>
  )

}


/* Scrollbar react component should go here :  */





/* Icon react component should go here : */
/* Specifications :
1. The icon it uses
2. The command it calls
3. Its name
*/

interface ToolIconProps {
  toolName: string;
  Command: any;
  ReactIcon:  React.FC<{className: string}>;
  active: boolean;
  onClick: () => void;
}

const ToolIcon: React.FC<ToolIconProps> = ({ toolName, Command, ReactIcon, active, onClick }) => {
  const loadTool = () => {
    console.log(`${toolName} Tool (wired)`);
    const commandInstance : Command = new Command();
    System.activeTool = commandInstance;
    onClick();
  };

  return (
    <button 
      id={toolName.replace(/\s+/g, '')} 
      className={active ? "active-class" : ""}
    >
      <NbCompDrop icon={ReactIcon} active={active} onClick={loadTool}>
        <div></div>
      </NbCompDrop>  
    </button>
  );
};


export default ToolBar;
