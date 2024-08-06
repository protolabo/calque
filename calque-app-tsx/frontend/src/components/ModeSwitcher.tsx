import { useContext, useState, useCallback } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { LiaToggleOffSolid } from 'react-icons/lia';
import { LiaToggleOnSolid } from 'react-icons/lia';
import { MdPreview } from 'react-icons/md';
import { AppContext, SelectedEntityContext } from './Layout';
import { TiExport } from 'react-icons/ti';
import { LuUserCircle2 } from "react-icons/lu";
import { FaRegSave } from "react-icons/fa";
import { loadState, saveState } from '../redux/localStorage';




const ModeSwitcher = () => {
  const { page, mode, setMode } = useContext(AppContext);
  const [ hovered, setHovered ] = useState(false);
  const { setSelectedEntity } = useContext(SelectedEntityContext);

  const editorIconStyle  = mode === 'edit' ? 'w-8 h-8' : 'w-8 h-8 opacity-50';
  const previewIconStyle = mode === 'view' ? 'w-8 h-8' : 'w-8 h-8 opacity-50';

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);
  const exportMap = () => {
    setSelectedEntity(null);
    setTimeout(() => {
      const map = document.getElementById("canvas")?.cloneNode(true) as SVGSVGElement;
      if (map) {
        map.querySelectorAll('image').forEach(img => img.remove());
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(map);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'myMap.calque.svg';
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 0);
  };

 


  const saveToDatabase = () => {
      const graph = loadState()
      console.log(graph)
      // Send the POST request using fetch
      fetch('http://localhost:3000/api/project/', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(graph),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the JSON de la repoonse
      })
      .then(data => {
          console.log('Recette ajoutee:', data); // Handle donnée de réponse
      })
      .catch(error => {
          console.error('Erreur lors de la creation de la recette:', error); // Handle any errors
      });


  }

  return (
    <div className="flex justify-end items-center gap-4">
      {page === "creation" &&
        <>
          <div className="flex flex-wrap items-center gap-2">
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
          <button className='flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg hover:bg-blue-600'
            onClick={saveToDatabase}>
              Save
              <FaRegSave className='w-6 h-6'/>
          </button>

          <button className='flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg hover:bg-blue-600'
            onClick={exportMap}>
            Export
            <TiExport className='w-6 h-6'/>
          </button>
        </>
      }
      {page === 'menu' && (
        <>
          <div className="flex gap-2 items-center">
            <div className="text-white">User-1</div>
            <LuUserCircle2 className='w-8 h-8'/>
          </div>
        </>
      )
      }
    </div>
  );
};

export default ModeSwitcher;
