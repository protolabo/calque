import { GraphHandler } from "../components/Layout";
import { GraphState } from "./graph";

interface EdgeState {
    id: number;
    name: string;
    node1id: number;
    node2id: number;
    stroke: string;
    strokeWidth: number;
    description: string;
}

function getEdge(graph: GraphState, edgeId: number): EdgeState {
  const edge = graph.edges.find(edge => edge.id === edgeId);
  if (edge === undefined) {
    throw `No edge ${edgeId} found in the graph.`;
  }

  return edge;
}

function insertEdge(handler: GraphHandler, node1id: number, node2id: number) {
  const { lastEditedEdge } = handler;
  const edge : EdgeState = {
    id: handler.graph.autoIncrement,
    name: `edge-${handler.graph.autoIncrement}`,
    node1id,
    node2id,
    stroke: lastEditedEdge?.stroke || '#3E4256',
    strokeWidth: lastEditedEdge?.strokeWidth || 15,
    description: '',
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

function deleteEdge(handler: GraphHandler, edgeId: number) {
  const graph = {
    ...handler.graph,
    edges: handler.graph.edges.filter(edge => edge.id !== edgeId),
  };

  handler.setGraph(graph);
}

export type { EdgeState };
export { getEdge, insertEdge, updateEdge, deleteEdge };

