import React, { useContext, useRef, useState } from 'react';
import { AppContext, SelectedNodeContext } from './Layout';
import Node, { NodeProps } from './Node';
import { EdgeProps } from './Edge';

function getPointerCanvasCoordinates<T>(canvas: SVGSVGElement, event: React.MouseEvent<T>) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
  };
}

interface CanvasHandler {
  ref: React.RefObject<SVGSVGElement>;
  dragging: boolean,
  setDragging: React.Dispatch<boolean>;
}

const CanvasContext = React.createContext<CanvasHandler>(undefined as any);

interface Graph {
  autoIncrement: number;
  nodes: NodeProps[];
  edges: EdgeProps[];
}

const emptyGraph = {
  autoIncrement: 0,
  nodes: [],
  edges: [],
}

const Canvas = () => {
  const { mode, tool } = useContext(AppContext);
  const { selectedNodeHandler } = useContext(SelectedNodeContext);
  const [graph, setGraph] = useState<Graph>(emptyGraph);
  const [dragging, setDragging] = useState<boolean>(false);
  const [selectedNodes, setSelectedNodes] = useState<NodeProps[]>([]);
  const canvasRef = useRef<SVGSVGElement>(null);

  const addNode = (event: React.MouseEvent<SVGSVGElement>) => {
    const coordinates = getPointerCanvasCoordinates(event.currentTarget, event);
    setGraph(prevGraph => ({
      autoIncrement: prevGraph.autoIncrement + 1,
      nodes: [...prevGraph.nodes, {
        id: prevGraph.autoIncrement,
        x: coordinates.x,
        y: coordinates.y,
      }],
      edges: prevGraph.edges,
    }))
  }

  const addEdge = (node: NodeProps) => {
    setSelectedNodes(prevSelectedNodes => {
      const newSelectedNodes = [...prevSelectedNodes, node];
      if (newSelectedNodes.length === 2) {
        const [node1, node2] = newSelectedNodes;
        setGraph(prevGraph => ({
          ...prevGraph,
          edges: [...prevGraph.edges, {
            id: prevGraph.edges.length,
            node1,
            node2,
          }]
        }));
        return [];
      }
      return newSelectedNodes;
    });
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (mode === 'edit' && tool === 'node') {
      addNode(event);
    }
  }

  const handleNodeClick = (node: NodeProps) => {
    if (mode === 'edit' && tool === 'edge') {
      addEdge(node);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (dragging && selectedNodeHandler !== null) {
      const coordinates = getPointerCanvasCoordinates(event.currentTarget, event);
      selectedNodeHandler.setNode({
        ...selectedNodeHandler.node,
        x: coordinates.x,
        y: coordinates.y,
      });
    }
  };

  const handleMouseLeave = () => {
    setDragging(false);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="flex grow justify-center bg-slate-400">
      <div className="bg-slate-100">
        <CanvasContext.Provider value={{ref: canvasRef, dragging, setDragging}}>
          <svg
            ref={canvasRef}
            className="relative z-20"
            width="920"
            height="938"
            viewBox="0 0 920 938"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
          >
            {graph.nodes.map((node) => (
              <Node key={node.id} id={node.id} x={node.x} y={node.y} />
            ))}
            {graph.edges.map(edge => (
              <Edge key={edge.id} id={edge.id} node1={edge.node1} node2={edge.node2} />
            ))}
          </svg>
        </CanvasContext.Provider>
      </div>
    </div>
  );
};

export default Canvas;
export { CanvasContext };
