import { useContext } from 'react';
import { GraphContext } from './Layout';
import { EdgeState, getNode } from './State';

interface EdgeProps {
  edge: EdgeState;
}

const Edge = (props: EdgeProps)  => {
  const { graph } = useContext(GraphContext);
  const node1 = getNode(graph, props.edge.node1id);
  const node2 = getNode(graph, props.edge.node2id);

  return (
    <line
      x1={node1.x}
      y1={node1.y}
      x2={node2.x}
      y2={node2.y}
      stroke="black"
      strokeWidth={3}
    />
  );
};

export default Edge;
