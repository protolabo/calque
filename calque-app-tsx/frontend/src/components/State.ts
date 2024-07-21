import { GraphHandler } from "./Layout";

interface GraphState {
  autoIncrement: number;
  nodes: NodeState[];
  edges: EdgeState[];
}

interface NodeState {
  id: number;
  name: string;
  x: number;
  y: number;
  color: string;
  size: number;
  stroke: string;
  strokeWidth: number;
}

interface EdgeState {
  id: number;
  name: string;
  node1id: number;
  node2id: number;
  stroke: string;
  strokeWidth: number;
}

function getNode(graph: GraphState, nodeId: number): NodeState {
  const node = graph.nodes.find(node => node.id === nodeId);
  if (node === undefined) {
    throw `No node ${nodeId} found in the graph.`;
  }

  return node;
}

function getEdge(graph: GraphState, edgeId: number): EdgeState {
  const edge = graph.edges.find(edge => edge.id === edgeId);
  if (edge === undefined) {
    throw `No edge ${edgeId} found in the graph.`;
  }

  return edge;
}

function insertNode(handler: GraphHandler, x: number, y: number) {
  const node = {
    id: handler.graph.autoIncrement,
    name: `node-${handler.graph.autoIncrement}`,
    x,
    y,
    size: 20,
    color: 'red',
    stroke: 'black',
    strokeWidth: 3,
  };

  const graph = {
    ...handler.graph,
    autoIncrement: handler.graph.autoIncrement + 1,
    nodes: [...handler.graph.nodes, node],
  };

  handler.setGraph(graph);
  return node;
}

function updateNode(handler: GraphHandler, updatedNode: NodeState) {
  const graph = {
    ...handler.graph,
    nodes: handler.graph.nodes.map(node => node.id === updatedNode.id ? updatedNode : node),
  };

  handler.setGraph(graph);
}

function insertEdge(handler: GraphHandler, node1id: number, node2id: number) {
  const edge = {
    id: handler.graph.autoIncrement,
    name: `edge-${handler.graph.autoIncrement}`,
    node1id,
    node2id,
    stroke: 'black',
    strokeWidth: 3,
  };

  const graph = {
    ...handler.graph,
    autoIncrement: handler.graph.autoIncrement + 1,
    edges: [...handler.graph.edges, edge],
  };

  handler.setGraph(graph);
  return edge;
}

function updateEdge(handler: GraphHandler) {
  // TODO
  const graph = {
    ...handler.graph,
  };

  handler.setGraph(graph);
}

const emptyGraph = {
  autoIncrement: 0,
  nodes: [],
  edges: [],
};

export type { GraphState, NodeState, EdgeState };
export { emptyGraph, getNode, getEdge , insertNode, updateNode, insertEdge, updateEdge };
