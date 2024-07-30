import { GraphHandler } from "../components/Layout";

interface GraphState {
  autoIncrement: number;
  nodes: NodeState[];
  edges: EdgeState[];
  images: ImageState[];
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
  description: string;
}

interface EdgeState {
  id: number;
  name: string;
  node1id: number;
  node2id: number;
  stroke: string;
  strokeWidth: number;
}

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

interface ImageState {
  id: number;
  x: number;
  y: number;
  width: number | undefined; // TODO gérer les undefined, c'est temporaire
  height: number | undefined;
  stroke: string;
  href: string;
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

function getImage(graph: GraphState, imageId: number): ImageState {
  const image = graph.images.find(image => image.id === imageId);
  if (image === undefined) {
    throw `No image ${imageId} found in the graph.`;
  }

  return image;
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
    description: '',
  };

  const graph = {
    ...handler.graph,
    autoIncrement: handler.graph.autoIncrement + 1,
    nodes: [...handler.graph.nodes, node],
  };

  handler.setGraph(graph);
  return node;
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

function insertImage(handler: GraphHandler, href: string) {
  const image = {
    id: handler.graph.autoIncrement,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    href
  } as ImageState;

  const graph = {
    ...handler.graph,
    autoIncrement: handler.graph.autoIncrement + 1,
    images: [...handler.graph.images, image],
  }

  handler.setGraph(graph);
  return image;
}

function updateNode(handler: GraphHandler, updatedNode: NodeState) {
  const graph = {
    ...handler.graph,
    nodes: handler.graph.nodes.map(node => node.id === updatedNode.id ? updatedNode : node),
  };

  handler.setGraph(graph);
}

function updateEdge(handler: GraphHandler, updatedEdge: EdgeState) {
  const graph = {
    ...handler.graph,
    edges: handler.graph.edges.map(edge => edge.id === updatedEdge.id ? updatedEdge : edge),
  };

  handler.setGraph(graph);
}

function updateImage(handler: GraphHandler, updatedImage: ImageState) {
  const graph = {
    ...handler.graph,
    images: handler.graph.images.map(image => image.id === updatedImage.id ? updatedImage : image),
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

function deleteImage(handler: GraphHandler, imageId: number) {
  const graph = {
    ...handler.graph,
    images: handler.graph.images.filter(image => image.id !== imageId),
  };

  handler.setGraph(graph);
}

const emptyGraph = {
  autoIncrement: 0,
  nodes: [],
  edges: [],
  images: []
};

export type { GraphState, NodeState, EdgeState, ImageState };
export { emptyGraph, getNode, getEdge, getImage, insertNode, insertImage, updateNode, updateImage, insertEdge, updateEdge, deleteEdge, deleteNode, deleteImage };
