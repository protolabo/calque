import { GraphHandler } from "../components/Layout";
import { GraphState } from "./graph";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

interface EdgeState {
    id: string;
    name: string;
    node1id: string;
    node2id: string;
    stroke: string;
    strokeWidth: number;
    description: string;
}

function getEdge(graph: GraphState, edgeId: string): EdgeState | null {
  const edge = graph.edges.find((edge) => edge.id === edgeId);
  if (edge === undefined) {
    console.error(`No edge ${edgeId} found in the graph.`)
    return null;
  }

  return edge;
}

function insertEdge(handler: GraphHandler, node1id: string, node2id: string) {
  const { lastEditedEdge } = handler;

  const sourceNode = handler.graph.nodes.find(node => node.id === node1id);
  const targetNode = handler.graph.nodes.find(node => node.id === node2id);

  if (!sourceNode || !targetNode) {
    console.error(`Cannot create edge. Missing node(s): ${!sourceNode ? node1id : ''} ${!targetNode ? node2id : ''}`);
    return; // Prevent edge creation if nodes are missing
  }

  const edge: EdgeState = {
    id: `${handler.graph.autoIncrement}-${uuidv4()}`,
    name: `edge-${handler.graph.autoIncrement}`,
    node1id,
    node2id,
    stroke: lastEditedEdge?.stroke || "#3E4256",
    strokeWidth: lastEditedEdge?.strokeWidth || 15,
    description: "",
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

function deleteEdge(handler: GraphHandler, edgeId: string) {
  const graph = {
    ...handler.graph,
    edges: handler.graph.edges.filter(edge => edge.id !== edgeId),
  };

  handler.setGraph(graph);
}

export type { EdgeState };
export { getEdge, insertEdge, updateEdge, deleteEdge };

