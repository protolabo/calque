import { useContext, useEffect } from 'react';
import { AppContext, GraphContext, SelectedEntityContext } from '../Layout';
import { deleteEdge, EdgeState } from '../../models/edge';
import { getNode } from '../../models/node'
import { CanvasContext } from '../Canvas';

interface EdgeProps {
  edge: EdgeState;
}

const Edge = (props: EdgeProps)  => {
  const { mode, tool } = useContext(AppContext)
  const graphHandler = useContext(GraphContext)
  const { selectedEntity, setSelectedEntity } = useContext(SelectedEntityContext);
  const { setAction } = useContext(CanvasContext);

  const node1 = getNode(graphHandler.graph, props.edge.node1id);
  const node2 = getNode(graphHandler.graph, props.edge.node2id);

  const isSelected = selectedEntity && selectedEntity.kind === 'edge' && selectedEntity.id === props.edge.id;

  const handleMouseDown = () => {
    if (mode === "edit" && tool === "select") {
      setSelectedEntity({ kind: 'edge', id: props.edge.id });
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { 
      if (mode === 'edit' && isSelected && (event.key === 'Delete')) {
        deleteEdge(graphHandler, props.edge.id);
        setSelectedEntity(null);
        setAction(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, props.edge.id, graphHandler, setSelectedEntity, setAction]);

  return (
    <g>
      <line
        x1={node1.x}
        y1={node1.y}
        x2={node2.x}
        y2={node2.y}
        stroke={props.edge.stroke}
        data-id={props.edge.id}
        strokeWidth={props.edge.strokeWidth}
        onMouseDown={handleMouseDown}
        data-description={props.edge.description}
      />
    
    {mode === 'edit' && (isSelected ? (
      <line
        x1={node1.x}
        y1={node1.y}
        x2={node2.x}
        y2={node2.y}
        stroke="blue"
        strokeWidth={props.edge.strokeWidth + 3}
        opacity={0.5}
        onMouseDown={handleMouseDown}
        data-description={props.edge.description}
      />
    ) : (
      <g/>
    ))}
    </g>
    
  );
};

export default Edge;
