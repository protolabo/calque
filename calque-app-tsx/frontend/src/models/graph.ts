import { loadState } from "../redux/localStorage";
import { EdgeState } from "./edge";
import { ImageState } from "./image";
import { NodeState } from "./node";

interface GraphState {
  autoIncrement: number;
  nodes: NodeState[];
  edges: EdgeState[];
  images: ImageState[];
}

/* LIGNES

type Line = 'Continuous' | 'Broken' | 'Loop';

interface LineState {
  id: number;
  name: string;
  nodes: number[];
  nodeFill: string;
  nodeStroke: string;
  nodeStrokeWidth: number;
  edges: number[];
  edgeStroke: string;
  edgeStrokeWidth: number;
  duration: number;
  type: Line;
}

*/

const emptyGraph = {
  autoIncrement: 0,
  nodes: [],
  edges: [],
  images: []
};

const currentGraph = loadState()

export type { GraphState };
export { currentGraph, emptyGraph };
