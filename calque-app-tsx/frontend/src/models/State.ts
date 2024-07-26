import { GraphHandler } from "../components/Layout";

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
    size: 15,
    color: 'white',
    stroke: 'blue',
    strokeWidth: 10,
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

function deleteNode(handler: GraphHandler, nodeId: number) {
  const graph = {
    ...handler.graph,
    nodes: handler.graph.nodes.filter(node => node.id !== nodeId),
    edges: handler.graph.edges.filter(edge => edge.node1id !== nodeId && edge.node2id !== nodeId),
  };

  handler.setGraph(graph);
}

function deleteEdge(handler: GraphHandler, edgeId: number) {
  const graph = {
    ...handler.graph,
    edges: handler.graph.edges.filter(edge => edge.id !== edgeId),
  };

  handler.setGraph(graph);
}

function insertEdge(handler: GraphHandler, node1id: number, node2id: number) {
  const edge = {
    id: handler.graph.autoIncrement,
    name: `edge-${handler.graph.autoIncrement}`,
    node1id,
    node2id,
    stroke: 'blue',
    strokeWidth: 40,
  };

  const graph = {
    ...handler.graph,
    autoIncrement: handler.graph.autoIncrement + 1,
    edges: [...handler.graph.edges, edge],
  };

  handler.setGraph(graph);
  return edge;
}

function updateEdge(handler: GraphHandler, updatedEdge: EdgeState) {
  const graph = {
    ...handler.graph,
    edges: handler.graph.edges.map(edge => edge.id === updatedEdge.id ? updatedEdge : edge),
  };

  handler.setGraph(graph);
}

const emptyGraph = {
  autoIncrement: 0,
  nodes: [],
  edges: [],
};

export type { GraphState, NodeState, EdgeState };
export { emptyGraph, getNode, getEdge , insertNode, updateNode, insertEdge, updateEdge, deleteEdge, deleteNode };
