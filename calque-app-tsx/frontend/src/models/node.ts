import { GraphHandler } from "../components/Layout";
import { GraphState } from "./graph";

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

function getNode(graph: GraphState, nodeId: number): NodeState {
  const node = graph.nodes.find(node => node.id === nodeId);
  if (node === undefined) {
    throw `No node ${nodeId} found in the graph.`;
  }

  return node;
}

function insertNode(handler: GraphHandler, x: number, y: number): NodeState {
  const { lastEditedNode } = handler;
  const node: NodeState = {
    id: handler.graph.autoIncrement,
    name: `node-${handler.graph.autoIncrement}`,
    x,
    y,
    size: lastEditedNode?.size || 15,
    color: lastEditedNode?.color || '#FFFFFF',
    stroke: lastEditedNode?.stroke || '#3E4256',
    strokeWidth: lastEditedNode?.strokeWidth || 10,
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

export type { NodeState };
export { getNode, insertNode, updateNode, deleteNode };
