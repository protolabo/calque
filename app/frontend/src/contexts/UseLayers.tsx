import React, { createContext, useContext, useState } from "react";

interface CanvasState {
  images: any[];
  nodes: any[];
  edges: any[];
  autoIncrement: number;
}

interface Layer {
  id: number;
  name: string;
  canvasState: CanvasState;
}

interface LayerContextType {
  layers: Layer[];
  activeLayerId: number;
  addLayer: () => void;
  setActiveLayer: (id: number) => void;
  updateCanvasState: (state: CanvasState) => void;
}

const LayerContext = createContext<LayerContextType | undefined>(undefined);

export const UseLayers = (props: {
  children: React.ReactNode;
}) => {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: 1,
      name: "Layer 1",
      canvasState: { images: [], nodes: [], edges: [], autoIncrement: 0 },
    },
  ]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const addLayer = () => {
    const newId = layers.length + 1;
    setLayers([
      ...layers,
      {
        id: newId,
        name: `Layer ${newId}`,
        canvasState: { images: [], nodes: [], edges: [], autoIncrement: 0 },
      },
    ]);
    setActiveLayerId(newId);
  };

  const setActiveLayer = (id: number) => {
    setActiveLayerId(id);
  };

  const updateCanvasState = (state: CanvasState) => {
    setLayers(
      layers.map((layer) =>
        layer.id === activeLayerId ? { ...layer, canvasState: state } : layer,
      ),
    );
  };

  return (
    <LayerContext.Provider
      value={{
        layers,
        activeLayerId,
        addLayer,
        setActiveLayer,
        updateCanvasState,
      }}
    >
      {props.children}
    </LayerContext.Provider>
  );
};

export const useLayers = () => {
  const context = useContext(LayerContext);
  if (!context)
    throw new Error("useLayers must be used within a LayerProvider");
  return context;
};
