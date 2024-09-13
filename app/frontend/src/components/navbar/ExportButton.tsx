import { useContext } from 'react';
import { TiExport } from 'react-icons/ti';
import { SelectedEntityContext } from '../Layout';

const ExportButton = () => {
  const { setSelectedEntity } = useContext(SelectedEntityContext);

  const exportMap = () => {
    setSelectedEntity(null);
    setTimeout(() => {
      const map = document.getElementById("canvas")?.cloneNode(true) as SVGSVGElement;
      if (map) {
        // map.querySelectorAll('image').forEach(img => img.remove());
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

  return (
    <button className='flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg hover:bg-blue-600'
      onClick={exportMap}>
      Export
      <TiExport className='w-6 h-6'/>
    </button>
  )
}

export default ExportButton