import { VscCircleLargeFilled } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import Logo from "./Logo";
import Arrow from "./Arrow";
import Edge from "./Edge";
import { FaArrowPointer } from "react-icons/fa6";
import { ReactNode } from "react";

function NbLeft(props: {children: ReactNode}){
    return(
        <div className="flex gap-4 justify-start">
            {props.children}
        </div>
    )
}

function NbCompDrop(props: {icon: React.FC<{className: string}>, children: ReactNode}){
    return(
        <div className="flex flex-wrap items-center hover:bg-violet-500 px-2">
                <props.icon className="w-6 h-6"/>
                <div>{props.children}</div>
                <Arrow/>
        </div>
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
            <NbCompDrop icon={Logo}>
                <div></div>
            </NbCompDrop>
            <NbCompDrop icon={FaArrowPointer}>
                <div></div>
            </NbCompDrop>
            <NbCompDrop icon={VscCircleLargeFilled}>
                <div></div>
            </NbCompDrop>
            <NbCompDrop icon={Edge}>
                <div></div>
            </NbCompDrop>  
        </NbLeft>
        
        <NbTitle>
            <div>Carte-globale</div>
            <div>/</div>
            <div>Sous-carte-1</div>
        </NbTitle>

        <div className="flex gap-4">
            <div className="flex flex-wrap items-center mx-auto gap-8">
                <div className="text-lg">Prototype 1.0</div>
                <div className="flex flex-wrap items-center">
                    <FaPlay className="w-6 h-6"/>
                    <Arrow/>
                </div>
                
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
