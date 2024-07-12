import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { LiaToggleOffSolid } from "react-icons/lia";
import { LiaToggleOnSolid } from "react-icons/lia";
import { MdPreview } from "react-icons/md"; 

function ModeSwitcher() {
    return (
        <div className="flex justify-end">
            <div className="flex flex-wrap items-center gap-4">
                    <FaRegEdit className="w-8 h-8"/>
                    <LiaToggleOffSolid className="w-8 h-8"/>
                    {/*<Link to="/Preview"><FaPlay className="w-8 h-8"/></Link>*/}
                    <MdPreview className="w-8 h-8"/>
            </div>
        </div>
  )
}

export default ModeSwitcher