import React, { useContext } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { LiaToggleOffSolid } from "react-icons/lia";
import { LiaToggleOnSolid } from "react-icons/lia";
import { MdPreview } from "react-icons/md"; 
import { ModeContext } from './Layout';

function ModeSwitcher() {
    const [mode, setMode] = useContext(ModeContext);

    const toggleMode = () => setMode(mode === 'editor' ? 'preview' : 'editor');

    const editorIconStyle = mode === 'editor' ? "w-8 h-8" : "w-8 h-8 opacity-50";
    const previewIconStyle = mode === 'preview' ? "w-8 h-8" : "w-8 h-8 opacity-50";

    return (
        <div className="flex justify-end">
            <div className="flex flex-wrap items-center gap-4">
                <FaRegEdit className={editorIconStyle} />
                <button onClick={toggleMode}>
                    {mode === 'preview' ? <LiaToggleOnSolid className='w-6 h-6'/> : <LiaToggleOffSolid className='w-6 h-6'/>}
                </button>
                {/*
                <Link to="/Preview">
                    <FaPlay className="w-8 h-8"/>
                </Link>
                */}
                <MdPreview className={previewIconStyle} />
            </div>
        </div>
    );
}

export default ModeSwitcher;