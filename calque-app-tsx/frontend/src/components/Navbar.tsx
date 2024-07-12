import { FaPlay } from "react-icons/fa";
import Arrow from "../assets/Arrow.asset";
import { FaArrowPointer } from "react-icons/fa6";
import { ReactNode } from "react";
import ToolBar from "./ToolBar";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.asset";
import { FaRegEdit } from "react-icons/fa";
import { LiaToggleOffSolid } from "react-icons/lia";
import { LiaToggleOnSolid } from "react-icons/lia";
import { MdPreview } from "react-icons/md"; 

function NbLeft(props: {children: ReactNode}){
    return(
        <div className="flex gap-4 justify-start items-center">
            {props.children}
        </div>
    )
}


function NbCompDrop(props: {
    icon: React.FC<{className: string}>, 
    children: ReactNode,
    active: boolean,
    onClick: () => void;
}){
    const activeClass = props.active ? "bg-blue-500 rounded-lg" : "bg-primary";

    return(
        <button className={`flex flex-wrap items-center ${activeClass} hover:bg-blue-500 hover:rounded-lg active:bg-secondary px-2 py-2 mx-1`} onClick={props.onClick}>
                <props.icon className="w-6 h-6"/>
                <div>{props.children}</div>
                {/*<Arrow/>*/}
        </button>
    )
}

function NbTitle(props: {children: ReactNode}){
    return(
        <div className="text-white flex justify-items-center gap-2 items-center font-bold text-xl px-1">
            {props.children}
        </div>
    )
}



function Navbar() {
  return (
    <div className=" bg-primary text-white flex items-center justify-between mx-auto p-2">

        <NbLeft>
            <Logo/>
            <ToolBar/>
        </NbLeft>
        
        <NbTitle>
            <div>Carte-globale</div>
            <div>/</div>
            <div>Sous-carte-1</div>
        </NbTitle>

        <div className="flex gap-4">
            <div className="flex flex-wrap items-center mx-auto gap-8">
                
                <div className="flex flex-wrap items-center gap-4">
                    <FaRegEdit className="w-8 h-8"/>
                    <LiaToggleOffSolid className="w-8 h-8"/>
                    {/*<Link to="/Preview"><FaPlay className="w-8 h-8"/></Link>*/}
                    <MdPreview className="w-8 h-8"/>
                </div>
                
            </div>
        </div>
      
    </div>
  )
}

export {Navbar, NbLeft, NbCompDrop, NbTitle }
