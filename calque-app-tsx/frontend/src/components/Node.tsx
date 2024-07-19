import { useContext, useState } from 'react';
import { AppContext, SelectedNodeContext } from './Layout';
import { CanvasContext } from './Canvas';

interface NodeState {
  id: number;
  name: string;
  x: number;
  y: number;
  color: string,
  size: number;
}

interface NodeHandler {
  node: NodeState,
  setNode: React.Dispatch<NodeState>,
}

interface NodeProps {
  id: number;
  x: number;
  y: number;
}

const Node = (props: NodeProps) => {
  const { mode, tool } = useContext(AppContext);
  const { setSelectedNodeHandler } = useContext(SelectedNodeContext);
  const { setDragging } = useContext(CanvasContext);

  const [node, setNode] = useState<NodeState>({
    id: props.id,
    name: `node-${props.id}`,
    x: props.x,
    y: props.y,
    size: 25,
    color: 'red',
  });

  const handleMouseDown = () => {
    if (mode === 'edit' && tool === 'select') {
      const setSelectedNode = (node: NodeState) => {
        setNode(node);
        setSelectedNodeHandler({ node, setNode: setSelectedNode });
      };

      setSelectedNodeHandler({ node, setNode: setSelectedNode });
      setDragging(true);
    }
  }

  return (
    <circle
      stroke="black"
      strokeWidth="3"
      cx={node.x}
      cy={node.y}
      r={node.size}
      fill={node.color}
      onMouseDown={handleMouseDown}
    />
  );
}

export default Node;
export type { NodeHandler, NodeProps, NodeState };
