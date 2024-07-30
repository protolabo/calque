import { useContext, useEffect } from "react";
import { deleteImage, ImageState } from "../models/State"
import { AppContext, GraphContext, SelectedEntityContext } from "./Layout";
import { CanvasContext } from "./Canvas";

interface ImageProps {
    image: ImageState;
}

const Image = (props: ImageProps) => {
  const { mode, tool } = useContext(AppContext);
  const graphHandler = useContext(GraphContext);
  const { selectedEntity, setSelectedEntity } = useContext(SelectedEntityContext);
  const { action, setAction } = useContext(CanvasContext);

  const isSelected = selectedEntity && selectedEntity.kind === 'image' && selectedEntity.imgId === props.image.id;

  const handleClick = () => {};

  const handleMouseDown = (event: React.MouseEvent<SVGImageElement>) => {
    if (mode === 'edit' && tool === 'select') {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left; // Calculate the offset for X
      const offsetY = event.clientY - rect.top;  // Calculate the offset for Y
  
      setAction({
        kind: 'dragImg',
        imgId: props.image.id,
        offsetX, // Store offsetX
        offsetY  // Store offsetY
      });
  
      setSelectedEntity({ kind: 'image', imgId: props.image.id });
    }
  };
  

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { // Typing the event as KeyboardEvent
        if (mode === 'edit' && isSelected && (event.key === 'Delete')) {
          event.preventDefault(); // Prevent the default backspace action (navigate back)
          deleteImage(graphHandler, props.image.id);
          setSelectedEntity(null);
          setAction(null);
        }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, props.image.id, graphHandler, selectedEntity, setAction]);

  return (
    <g>
        <image 
            x={props.image.x}
            y={props.image.y}
            href={props.image.href}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
        />
        {mode === 'edit' && (isSelected ? (
            <image
                stroke='blue'
                strokeWidth={3}
                x={props.image.x}
                y={props.image.y}
                href={props.image.href}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
            />
        ) : <g/> )}
    </g>
  )
}

export default Image