import { VscCircleLargeFilled } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import Logo from "./Logo";
import Arrow from "./Arrow";
import Edge from "./Edge";
import { FaArrowPointer } from "react-icons/fa6";

function Navbar() {
  return (
    <div className=" bg-primary text-white flex items-center justify-between mx-auto p-4">

        <div className="flex gap-4">
            <div className="flex flex-wrap items-center">
                <Logo />
                <Arrow/>
            </div>
            <div className="flex flex-wrap items-center">
                <FaArrowPointer className="w-6 h-6"/>
                <Arrow/>
            </div>
            <div className="flex flex-wrap items-center">
                <VscCircleLargeFilled className="w-6 h-6"/>
                <Arrow/>
            </div>
            <div className="flex flex-wrap items-center">
                <Edge/>
                <Arrow/>
            </div>   
        </div>
        
        <div className="text-white flex justify-items-center gap-2 items-center font-bold text-xl">
            <div>Carte-globale</div>
            <div>/</div>
            <div>Sous-carte-1</div>
        </div>

        <div className="flex gap-4">
            <div className="flex flex-wrap items-center">
                <FaPlay className="w-6 h-6"/>
                <Arrow/>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
