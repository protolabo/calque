import React, { useContext, useEffect, useRef, useState } from "react";
import Edge from "./entities/Edge";
import { AppContext, GraphContext, SelectedEntityContext } from "./Layout";
import Node from "./entities/Node";
import { getImage, insertImage, updateImage } from "../models/image";
import { getNode, insertNode, updateNode } from "../models/node";
import MyImage from "./entities/Image";
import { useLayers } from "../contexts/UseLayers.tsx";
import { emptyGraph } from "../models/graph.ts";

function getPointerCanvasCoordinates<T>(
  canvas: SVGSVGElement,
  event: React.MouseEvent<T>,
) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: Math.round(event.clientX - bounds.left),
    y: Math.round(event.clientY - bounds.top),
  };
}

type CanvasAction =
  | { kind: "drag"; nodeId: string }
  | { kind: "edge"; nodeId: string }
  | { kind: "dragImg"; imgId: string; offsetX: number; offsetY: number };

interface CanvasHandler {
  ref: React.RefObject<SVGSVGElement>;
  action: CanvasAction | null;
  setAction: React.Dispatch<CanvasAction | null>;
}

const CanvasContext = React.createContext<CanvasHandler>(undefined as any);

const Canvas = () => {
  const { mode, tool } = useContext(AppContext);
  const graphHandler = useContext(GraphContext);
  const { setSelectedEntity } = useContext(SelectedEntityContext);
  const [action, setAction] = useState<CanvasAction | null>(null);
  const canvasRef = useRef<SVGSVGElement>(null);

  //const [image, setImage] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log("canvas is clicked");
    if (mode === "edit" && tool === "node") {
      const coordinates = getPointerCanvasCoordinates(
        event.currentTarget,
        event,
      );
      const node = insertNode(
        graphHandler,
        coordinates.x,
        coordinates.y,
        activeLayerId,
      );
      setSelectedEntity({ kind: "node", id: node.id });
    }
    if (
      event.target === event.currentTarget ||
      event.target instanceof SVGImageElement
    ) {
      if (tool !== "node") {
        setSelectedEntity(null);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    // Need to check if can move canva or only node/edge
    if (action !== null) {
      switch (action.kind) {
        case "drag":
          const coordinates = getPointerCanvasCoordinates(
            event.currentTarget,
            event,
          );
          const node = getNode(graphHandler.graph, action.nodeId);

          if (node) {
            updateNode(graphHandler, {
              ...node,
              x: coordinates.x,
              y: coordinates.y,
            });
          }

          break;
        case "dragImg":
          const canvasCoordinates = getPointerCanvasCoordinates(
            event.currentTarget,
            event,
          );
          const newX = canvasCoordinates.x - action.offsetX;
          const newY = canvasCoordinates.y - action.offsetY;

          const image = getImage(graphHandler.graph, action.imgId);
          updateImage(graphHandler, {
            ...image,
            x: newX,
            y: newY,
          });
          break;
        case "edge":
          // TODO peut-être étirer un edge du node1 au prochain node?
          break;
        default:
          break;
      }
    }
  };

  const handleMouseLeave = () => {
    if (action !== null) {
      setAction(null);
    }
  };

  const handleMouseUp = () => {
    if (action !== null) {
      switch (action.kind) {
        case "drag":
          setAction(null);
          break;
        case "dragImg":
          setAction(null);
          break;
        case "edge":
          // TODO supprimer la "demi-edge" qui suivait le curseur si on n'est pas sur un node, sinon créer le edge?? maybe??
          break;
        default:
          break;
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<SVGSVGElement>) => {
    console.log("Ctrl + V used");
    const clipboardData = event.clipboardData;
    if (mode !== "edit" || !clipboardData) {
      console.log("Item cannot be pasted");
      return;
    }

    const items = clipboardData.items;
    if (items) {
      for (const item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = (e: ProgressEvent<FileReader>) => {
              const imageData = e.target?.result;
              if (typeof imageData === "string") {
                const img = new Image();
                img.onload = () => {
                  //setImage(imageData);
                  const newImage = insertImage(
                    graphHandler,
                    imageData,
                    img.width,
                    img.height,
                    activeLayerId,
                  );
                  setSelectedEntity({ kind: "image", id: newImage.id });
                };
                img.src = imageData;
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    }
  };

  const { layers, activeLayerId, setLayers } = useLayers();
  const activeLayer = layers.find((layer) => layer.id === activeLayerId);
  const prevActiveLayerIdRef = useRef<number>(activeLayerId);

  useEffect(() => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === activeLayerId
          ? { ...layer, canvasState: graphHandler.graph }
          : layer,
      ),
    );
  }, [graphHandler.graph]);

  useEffect(() => {
    // this initialises or restores the canvas state when the active layer changes\
    console.log(
      "Switched to Layer:",
      activeLayerId,
      "State:",
      activeLayer?.canvasState,
    );
  }, [activeLayerId, activeLayer]);

  useEffect(() => {
    const prevActiveLayerId = prevActiveLayerIdRef.current;

    if (prevActiveLayerId !== activeLayerId) {
      // Save the current graph to the previous layer's canvasState
      setLayers((prevLayers) =>
        prevLayers.map((layer) =>
          layer.id === prevActiveLayerId
            ? { ...layer, canvasState: graphHandler.graph }
            : layer,
        ),
      );
    }

    // to ensure that the selected entity is cleared when switching layers
    setSelectedEntity(null);

    // Set the graph to the new active layer's canvasState
    graphHandler.setGraph(
      activeLayer?.canvasState ? activeLayer?.canvasState : emptyGraph,
    );

    prevActiveLayerIdRef.current = activeLayerId;
  }, [activeLayerId]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      console.log(items);
    };

    const canvasElem = canvasRef.current;
    canvasElem?.addEventListener("paste", handlePaste);

    canvasElem?.focus();

    return () => {
      canvasElem?.removeEventListener("paste", handlePaste);
    };
  }, []);

  /*  D3 zoom function *

  function initializeZoom() {
    d3.select("svg")
      .call(zoom);
  }

  const zoom = d3.zoom().on("zoom", handleZoom);
  function handleZoom(e) {
    const { x, y, k } = e.transform;

    d3.select("svg g")
      .attr("transform", () => `scale(${k})`)
  }*/

  return (
    <div className="flex basis-4/6 grow justify-center bg-slate-400">
      <div className="bg-slate-100 justify-center">
        <CanvasContext.Provider value={{ ref: canvasRef, action, setAction }}>
          <svg
            ref={canvasRef}
            id="canvas"
            width="1100"
            height="980"
            viewBox="0 0 1100 980"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onPaste={handlePaste}
          >
            {layers.map(
              (layer) =>
                layer.visible && (
                  <g key={layer.id} opacity={layer.opacity}>
                    {layer.canvasState.images.map((image) => (
                      <MyImage key={image.id} image={image} />
                    ))}
                    {layer.canvasState.edges.map((edge) => (
                      <Edge
                        key={edge.id}
                        edge={edge}
                        graph={layer.canvasState}
                      />
                    ))}
                    {layer.canvasState.nodes.map((node) => (
                      <Node key={node.id} node={node} />
                    ))}
                  </g>
                ),
            )}
          </svg>
        </CanvasContext.Provider>
      </div>
    </div>
  );
};

export default Canvas;
export { CanvasContext, getPointerCanvasCoordinates };
