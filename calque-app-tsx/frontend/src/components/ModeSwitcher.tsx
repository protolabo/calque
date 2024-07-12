import React, { useContext } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { LiaToggleOffSolid } from "react-icons/lia";
import { LiaToggleOnSolid } from "react-icons/lia";
import { MdPreview } from "react-icons/md"; 

import { ModeContext } from './Layout';

function ModeSwitcher() {
    const [mode, setMode] = useContext(ModeContext)

    return (
        <div className="flex justify-end">
            <div className="flex flex-wrap items-center gap-4">
                    <FaRegEdit className="w-8 h-8"/>
                    <button onClick={() => {setMode(mode === 'editor' ? 'preview' : 'editor')}}>
                        {mode === "preview" && <LiaToggleOnSolid className='w-6 h-6'/>}
                        {mode === "editor" && <LiaToggleOffSolid className='w-6 h-6'/>}
                    </button>
                    
                    {/*<Link to="/Preview"><FaPlay className="w-8 h-8"/></Link>*/}
                    <MdPreview className="w-8 h-8"/>
            </div>
        </div>
    )
}

export default ModeSwitcher