import { useContext } from 'react';
import { AppContext, GraphContext, SelectedEntityContext } from './Layout';
import { EdgeState, getNode } from '../models/State';

interface EdgeProps {
  edge: EdgeState;
}

const Edge = (props: EdgeProps)  => {
  const { mode, tool } = useContext(AppContext)
  const { graph } = useContext(GraphContext);
  const { selectedEntity, setSelectedEntity } = useContext(SelectedEntityContext);

  const node1 = getNode(graph, props.edge.node1id);
  const node2 = getNode(graph, props.edge.node2id);

  const isSelected = selectedEntity && selectedEntity.kind === 'edge' && selectedEntity.edgeId === props.edge.id;

  const handleMouseDown = () => {
    if (mode === "edit" && tool === "select") {
      setSelectedEntity({ kind: 'edge', edgeId: props.edge.id });
    }
  }

  return (
    <g>
      <line
        x1={node1.x}
        y1={node1.y}
        x2={node2.x}
        y2={node2.y}
        stroke={props.edge.stroke}
        strokeWidth={props.edge.strokeWidth}
        onMouseDown={handleMouseDown}
      />
    
    {mode === 'edit' && tool === 'select' && (isSelected ? (
      <line
        x1={node1.x}
        y1={node1.y}
        x2={node2.x}
        y2={node2.y}
        stroke="blue"
        strokeWidth={props.edge.strokeWidth + 3}
        opacity={0.5}
        onMouseDown={handleMouseDown}
      />
    ) : (
      <g/>
    ))}
    </g>
    
  );
};

export default Edge;
