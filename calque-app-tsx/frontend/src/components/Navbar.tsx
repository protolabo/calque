import { FaPlay } from "react-icons/fa";
import Arrow from "../assets/Arrow.asset";
import { FaArrowPointer } from "react-icons/fa6";
import { ReactNode } from "react";
import ToolBar from "./ToolBar";
import { Link } from "react-router-dom";

function NbLeft(props: {children: ReactNode}){
    return(
        <div className="flex gap-4 justify-start">
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
    const activeClass = props.active ? "bg-violet-500" : "bg-primary";

    return(
        <button className={`flex flex-wrap items-center ${activeClass} hover:bg-violet-500 active:bg-secondary px-3 py-1`} onClick={props.onClick}>
                <props.icon className="w-6 h-6"/>
                <div>{props.children}</div>
                {/*<Arrow/>*/}
        </button>
    )
}

function NbTitle(props: {children: ReactNode}){
    return(
        <div className="text-white flex justify-items-center gap-2 items-center font-bold text-xl p-1">
            {props.children}
        </div>
    )
}

function Navbar() {
  return (
    <div className=" bg-primary text-white flex items-center justify-between mx-auto p-4">

        <NbLeft>
            <ToolBar/>
        </NbLeft>
        
        <NbTitle>
            <div>Carte-globale</div>
            <div>/</div>
            <div>Sous-carte-1</div>
        </NbTitle>

        <div className="flex gap-4">
            <div className="flex flex-wrap items-center mx-auto gap-8">
                
                <div className="flex flex-wrap items-center">
                <Link to="/Preview"><FaPlay className="w-6 h-6"/></Link>
                    
                </div>
                
            </div>
        </div>
      
    </div>
  )
}

export {Navbar, NbLeft, NbCompDrop, NbTitle }
