import { useContext, useState } from 'react';
import { AppContext, SelectedNodeContext } from './Layout';
import { CanvasContext } from './Canvas';

interface EdgeState {
  id: number;
  name: string;
  x: number;
  y: number;
  color: string;
  size: number;
  stroke: string;
  strokeWidth: number;
}

interface EdgeHandler {
  node: EdgeState,
  setNode: React.Dispatch<EdgeState>,
}

interface EdgeProps {
  id: number;
  node1: Node;
  node2: Node;
}


function Edge() {
  return (
    <line x1="0" y1="0" x2="300" y2="200" stroke="black" strokeWidth={3} /> //temp, need to connect node and edge
  )
}

export default Edge;
export type { EdgeHandler, EdgeProps, EdgeState };