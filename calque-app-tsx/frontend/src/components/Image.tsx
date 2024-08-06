import { useContext, useEffect } from "react";
import { deleteImage, ImageState } from "../models/State"
import { AppContext, GraphContext, SelectedEntityContext } from "./Layout";
import { CanvasContext } from "./Canvas";

interface ImageProps {
    image: ImageState;
}

const MyImage = (props: ImageProps) => {
  const { mode, tool } = useContext(AppContext);
  const graphHandler = useContext(GraphContext);
  const { selectedEntity, setSelectedEntity } = useContext(SelectedEntityContext);
  const { setAction } = useContext(CanvasContext);

  const isSelected = selectedEntity && selectedEntity.kind === 'image' && selectedEntity.id === props.image.id;

  const handleClick = () => {};

  const handleMouseDown = (event: React.MouseEvent<SVGImageElement | SVGRectElement>) => {
    if (mode === 'edit' && tool === 'select') {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left; 
      const offsetY = event.clientY - rect.top; 
  
      setAction({
        kind: 'dragImg',
        imgId: props.image.id,
        offsetX, 
        offsetY  
      });
  
      setSelectedEntity({ kind: 'image', id: props.image.id });
    }
  };
  

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { 
        if (mode === 'edit' && isSelected && (event.key === 'Delete')) {
          event.preventDefault(); 
          deleteImage(graphHandler, props.image.id);
          setSelectedEntity(null);
          setAction(null);
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, props.image.id, graphHandler, selectedEntity, setAction]);

  return (
    <g>
        <image 
            className="imageContainer"
            x={props.image.x}
            y={props.image.y}
            width={props.image.width} 
            height={props.image.width * props.image.ratio}
            href={props.image.href}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            opacity={props.image.opacity}
        />
        {mode === 'edit' && (isSelected ? (
          <rect 
            stroke="blue" 
            strokeWidth={3} 
            width={props.image.width} 
            height={props.image.width * props.image.ratio} 
            opacity="0.5"
            x={props.image.x}
            y={props.image.y}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            >
            <image
                className="imageContainer"
                x={props.image.x}
                y={props.image.y}
                width={props.image.width} 
                height={props.image.width * props.image.ratio} 
                href={props.image.href}
                opacity={props.image.opacity}
            />
          </rect>
            
        ) : <g/> )}
    </g>
  )
}

export default MyImage