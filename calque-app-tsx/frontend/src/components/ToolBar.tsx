import React from 'react';
import { useContext} from 'react';
import { Tool, AppContext } from './Layout';

//icons
import { VscCircleLargeFilled} from "react-icons/vsc";
import { FaHandPaper } from "react-icons/fa";
import Edge from "./../assets/Edge.asset";
import { RiCursorFill } from "react-icons/ri";
//General components
import {NbCompDrop} from './Navbar';

type Icon = React.FC<{className: string}>

const tools: ToolIconProps[] = [
  {name: 'select', icon: RiCursorFill},
  {name: 'node', icon: VscCircleLargeFilled},
  {name: 'edge', icon: Edge},
  //{name: 'pan', icon: FaHandPaper},
];

const ToolBar = () => {
  return (
    <div className="flex items-center justify-between">
      {tools.map((tool) => (
        <ToolIcon
        key={tool.name}
        name={tool.name}
        icon={tool.icon}
        />
      ))}
    </div>
  );
}

interface ToolIconProps {
  name: Tool;
  icon: Icon;
}

const ToolIcon: React.FC<ToolIconProps> = (props: ToolIconProps) => {
  const { tool, setTool } = useContext(AppContext);
  const active = props.name === tool;

  return (
    <button className={active ? 'active-class' : ''}>
      <NbCompDrop icon={props.icon} active={active} onClick={() => setTool(props.name)}>
        <div />
      </NbCompDrop>
    </button>
  );
};

export default ToolBar;
