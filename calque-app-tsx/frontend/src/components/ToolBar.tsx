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



function ToolBar() {

  return (
    <div id="ToolBar" className="flex items-center">
        <Logo/>
      {/*Template:

        <ToolIcon 
        toolName="ToolNameForPrint" 
        Command={ToolCommandClass} 
        ReactIcon={ReactIcon} 
        />
      
      */}


        {/*Panning the canvas button*/}
        <ToolIcon 
        toolName="Pan" 
        Command={PanCommand} 
        ReactIcon={FaHandPaper} 
        />

        {/*Create an Edge on the Canvas button*/}
        <ToolIcon 
        toolName="CreateEdge" 
        Command={CreateEdgeCommand} 
        ReactIcon={Edge} 
        />
        {/*Create a Node on the Canvas button*/}
        <ToolIcon 
        toolName="CreateNode" 
        Command={CreateNodeCommand} 
        ReactIcon={VscCircleLargeFilled} 
        />
        {/*Select Canvas Element button*/}
        <ToolIcon 
        toolName="Select" 
        Command={SelectCommand} 
        ReactIcon={RiCursorFill} 
        />
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
}

const ToolIcon: React.FC<ToolIconProps> = ({ toolName, Command, ReactIcon }) => {
  const loadTool = () => {
    console.log(`${toolName} Tool (wired)`);
    const commandInstance : Command = new Command();
    System.activeTool = commandInstance;
  };

  return (
    <button 
      id={toolName.replace(/\s+/g, '')} 
      className=""
      onClick={loadTool}
    >
      <NbCompDrop icon={ReactIcon}>
        <div></div>
      </NbCompDrop>  
    </button>
  );
};


export default ToolBar;
