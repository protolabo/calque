import { useContext } from 'react';
import { AppContext, GraphContext, SelectedEntityContext } from './Layout';
import { CanvasContext } from './Canvas';
import { NodeState, insertEdge } from '../models/State';

interface NodeProps {
  node: NodeState;
}

const Node = (props: NodeProps) => {
  const { mode, tool } = useContext(AppContext);
  const graphHandler = useContext(GraphContext);
  const { selectedEntity, setSelectedEntity } = useContext(SelectedEntityContext);
  const { action, setAction } = useContext(CanvasContext);

  const isSelected = selectedEntity && selectedEntity.kind === 'node' && selectedEntity.nodeId === props.node.id;

  const handleClick = () => {
    console.log(mode, tool, action, props.node);
    if (mode === 'edit' && tool === 'edge') {
      if (action === null) {
        setAction({ kind: 'edge', nodeId: props.node.id });
      } else if (action.kind === 'edge' && action.nodeId !== props.node.id) {
        const edge = insertEdge(graphHandler, action.nodeId, props.node.id);
        setSelectedEntity({ kind: 'edge', edgeId: edge.id });
        setAction(null);
      }
    }
  };

  const handleMouseDown = () => {
    if (mode === 'edit' && tool === 'select') {
      setAction({ kind: 'drag', nodeId: props.node.id });
      setSelectedEntity({ kind: 'node', nodeId: props.node.id });
    }
  };

  return (
    <g>
      <circle
          stroke={props.node.stroke}
          strokeWidth={props.node.strokeWidth}
          cx={props.node.x}
          cy={props.node.y}
          r={props.node.size}
          fill={props.node.color}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
        />
      {isSelected ? (
        <circle 
          stroke="blue"
          strokeWidth={props.node.strokeWidth}
          cx={props.node.x}
          cy={props.node.y}
          r={props.node.size + 3}
          opacity="0.5"
          onClick={handleClick}
          onMouseDown={handleMouseDown}
        />
      ) : <g/>}
      <text x={props.node.x + props.node.size +2} y={props.node.y + props.node.size +2} fill="black">{props.node.name}</text>
    </g>
  );
}

export default Node;
