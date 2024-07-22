import { useContext } from 'react';
import { AppContext, GraphContext, SelectedEntityContext } from './Layout';
import { CanvasContext } from './Canvas';
import { NodeState, insertEdge } from '../../models/State';

interface NodeProps {
  node: NodeState;
}

const Node = (props: NodeProps) => {
  const { mode, tool } = useContext(AppContext);
  const graphHandler = useContext(GraphContext);
  const { setSelectedEntity } = useContext(SelectedEntityContext);
  const { action, setAction } = useContext(CanvasContext);

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
  );
}

export default Node;
