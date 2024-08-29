import { useContext, useEffect } from 'react';
import { AppContext, GraphContext, SelectedEntityContext } from '../Layout';
import { CanvasContext } from '../Canvas';
import { NodeState, deleteNode } from '../../models/node';
import { insertEdge } from '../../models/edge'

interface NodeProps {
  node: NodeState;
}

const Node = (props: NodeProps) => {
  const { mode, tool } = useContext(AppContext);
  const graphHandler = useContext(GraphContext);
  const { selectedEntity, setSelectedEntity } = useContext(SelectedEntityContext);
  const { action, setAction } = useContext(CanvasContext);

  const isSelected = selectedEntity && selectedEntity.kind === 'node' && selectedEntity.id === props.node.id;

  const handleClick = () => {
    if (mode === 'edit' && tool === 'edge') {
      if (action === null) {
        setSelectedEntity({ kind : 'node', id: props.node.id })
        setAction({ kind: 'edge', nodeId: props.node.id });
      } else if (action.kind === 'edge' && action.nodeId !== props.node.id) {
        const edge = insertEdge(graphHandler, action.nodeId, props.node.id);
        setSelectedEntity({ kind: 'edge', id: edge.id })
        setAction(null);
      }
    }
  };

  const handleMouseDown = () => {
    if (mode === 'edit' && tool === 'select') {
      setAction({ kind: 'drag', nodeId: props.node.id });
      setSelectedEntity({ kind: 'node', id: props.node.id });
    }
  };

  // DELETE NODE

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { 
      if (mode === 'edit' && isSelected && event.key === 'Delete') {
        deleteNode(graphHandler, props.node.id);
        setSelectedEntity(null);
        setAction(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, props.node.id, graphHandler, setSelectedEntity, setAction]);

  return (
    <g>
      <circle
          stroke={props.node.stroke}
          strokeWidth={props.node.strokeWidth}
          cx={props.node.x}
          cy={props.node.y}
          r={props.node.size}
          fill={props.node.color}
          data-id={props.node.id}
          data-description={props.node.description}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
        />
      {mode === 'edit' && (isSelected ? (
        <circle 
          stroke="#0000FF"
          fill="#FFFFFF"
          fillOpacity={0}
          strokeWidth={6}
          cx={props.node.x}
          cy={props.node.y}
          r={props.node.size + (props.node.strokeWidth / 2)}
          opacity="0.3"
          onClick={handleClick}
          onMouseDown={handleMouseDown}
        />
      ) : <g/> )}
      <text x={props.node.x + props.node.size +2} y={props.node.y + props.node.size +2} fill="black">{props.node.name}</text>
    </g>
  );
}

export default Node;