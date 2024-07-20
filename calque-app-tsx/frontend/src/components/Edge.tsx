import { useContext, useState } from 'react';
import { AppContext, SelectedNodeContext } from './Layout';
import { CanvasContext } from './Canvas';
import Node, { NodeState } from './Node';

interface EdgeState {
  id: number;
  name: string;
  node1: NodeState;
  node2: NodeState;
  stroke: string;
  strokeWidth: number;
}

interface EdgeHandler {
  edge: EdgeState,
  setEdge: React.Dispatch<EdgeState>,
}

interface EdgeProps {
  id: number;
  node1: NodeState;
  node2: NodeState;
}


function Edge(props: EdgeProps) {
  const { node1, node2 } = props;

  return (
    <line
      x1={node1.x}
      y1={node1.y}
      x2={node2.x}
      y2={node2.y}
      stroke="black"
      strokeWidth={3}
    />
  )
}

export default Edge;
export type { EdgeHandler, EdgeProps, EdgeState };