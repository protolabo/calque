import { useContext, useState, useCallback } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { LiaToggleOffSolid } from 'react-icons/lia';
import { LiaToggleOnSolid } from 'react-icons/lia';
import { MdPreview } from 'react-icons/md';
import { AppContext } from './Layout';
import { TiExport } from 'react-icons/ti';

const ModeSwitcher = () => {
  const { mode, setMode } = useContext(AppContext);
  const [hovered, setHovered] = useState(false);

  const editorIconStyle  = mode === 'edit' ? 'w-8 h-8' : 'w-8 h-8 opacity-50';
  const previewIconStyle = mode === 'view' ? 'w-8 h-8' : 'w-8 h-8 opacity-50';

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <div className="flex justify-end items-center gap-8">
      <div className="flex flex-wrap items-center gap-4">
        {mode === 'edit' && hovered && <div>Preview your map</div>}
        {mode === 'view' && hovered && <div>Continue editing</div>}
        <FaRegEdit className={editorIconStyle} />
        <button
          onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {mode === 'view'
            ? <LiaToggleOnSolid className='w-6 h-6'/>
            : <LiaToggleOffSolid className='w-6 h-6'/>
          }
        </button>
        <MdPreview className={previewIconStyle} />
      </div>
      <button className='flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg'>
        Export
        <TiExport className='w-6 h-6'/>
      </button>
    </div>
  );
};

export default ModeSwitcher;
