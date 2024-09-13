import { useContext, useState, useCallback } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { LiaToggleOffSolid } from 'react-icons/lia';
import { LiaToggleOnSolid } from 'react-icons/lia';
import { MdPreview } from 'react-icons/md';
import { AppContext } from '../Layout';

const ModeSwitcher = () => {
  const { mode, setMode } = useContext(AppContext);
  const [ hovered, setHovered ] = useState(false);

  const editorIconStyle  = mode === 'edit' ? 'w-8 h-8' : 'w-8 h-8 opacity-50';
  const previewIconStyle = mode === 'view' ? 'w-8 h-8' : 'w-8 h-8 opacity-50';

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {mode === 'edit' && hovered && <div>Preview</div>}
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
  );
};

export default ModeSwitcher;
