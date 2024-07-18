import { useContext, useState, useCallback } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { LiaToggleOffSolid } from "react-icons/lia";
import { LiaToggleOnSolid } from "react-icons/lia";
import { MdPreview } from "react-icons/md"; 
import { ModeContext } from './Layout';
import { TiExport } from "react-icons/ti";

function ModeSwitcher() {
    const [mode, setMode] = useContext(ModeContext);
    const [hovered, setHovered] = useState(false);

    const toggleMode = () => setMode(mode === 'editor' ? 'preview' : 'editor');

    const editorIconStyle = mode === 'editor' ? "w-8 h-8" : "w-8 h-8 opacity-50";
    const previewIconStyle = mode === 'preview' ? "w-8 h-8" : "w-8 h-8 opacity-50";

    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    return (
        <div className="flex justify-end items-center gap-8">
            <div className="flex flex-wrap items-center gap-4">
                {mode === 'editor' && hovered && <div>Preview your map</div>}
                {mode === 'preview' && hovered && <div>Continue editing</div>}
                <FaRegEdit className={editorIconStyle} />
                <button onClick={toggleMode} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {mode === 'preview' ? <LiaToggleOnSolid className='w-7 h-7'/> : <LiaToggleOffSolid className='w-7 h-7'/>}
                </button>
                {/*
                <Link to="/Preview">
                    <FaPlay className="w-8 h-8"/>
                </Link>
                */}
                <MdPreview className={previewIconStyle} />
                

            </div>
            <button className='flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg'>
                Export
                <TiExport className='w-6 h-6'/>
            </button>
        </div>
    );
}

export default ModeSwitcher;