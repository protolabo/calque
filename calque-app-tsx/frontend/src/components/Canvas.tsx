import React, { useContext, useRef, useState } from 'react';
import Edge from './Edge';
import { AppContext, GraphContext, SelectedEntityContext } from './Layout';
import Node from './Node';
import { getNode, insertNode, updateNode } from './State';

function getPointerCanvasCoordinates<T>(canvas: SVGSVGElement, event: React.MouseEvent<T>) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: Math.round(event.clientX - bounds.left),
    y: Math.round(event.clientY - bounds.top),
  };
}

type CanvasAction =
  | { kind: 'drag', nodeId: number }
  | { kind: 'edge', nodeId: number }

interface CanvasHandler {
  ref: React.RefObject<SVGSVGElement>;
  action: CanvasAction | null,
  setAction: React.Dispatch<CanvasAction | null>;
}

const CanvasContext = React.createContext<CanvasHandler>(undefined as any);

const Canvas = () => {
  const { mode, tool } = useContext(AppContext);
  const graphHandler = useContext(GraphContext);
  const { setSelectedEntity } = useContext(SelectedEntityContext);
  const [action, setAction] = useState<CanvasAction | null>(null);
  const canvasRef = useRef<SVGSVGElement>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (mode === 'edit' && tool === 'node') {
      const coordinates = getPointerCanvasCoordinates(event.currentTarget, event);
      const node = insertNode(graphHandler, coordinates.x, coordinates.y);
      setSelectedEntity({ kind: 'node', nodeId: node.id });
    }
  }

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (action !== null && action.kind === 'drag') {
      const coordinates = getPointerCanvasCoordinates(event.currentTarget, event);
      const node = getNode(graphHandler.graph, action.nodeId);
      updateNode(graphHandler, {
        ...node,
        x: coordinates.x,
        y: coordinates.y,
      });
    }
  };

  const handleMouseLeave = () => {
    if (action !== null) {
      setAction(null);
    }
  };

  const handleMouseUp = () => {
    if (action !== null && action.kind === 'drag') {
      setAction(null);
    }
  };

  return (
    <div className="flex grow justify-center bg-slate-400">
      <div className="bg-slate-100">
        <CanvasContext.Provider value={{ ref: canvasRef, action, setAction }}>
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
            <g>
              {graphHandler.graph.edges.map(edge => (
                <Edge key={edge.id} edge={edge} />
              ))}
              {graphHandler.graph.nodes.map(node => (
                <Node key={node.id} node={node} />
              ))}
            </g> 
          </svg>
        </CanvasContext.Provider>
      </div>
    </div>
  );
};

export default Canvas;
export { CanvasContext, getPointerCanvasCoordinates };
