import React, {useEffect, useState} from "react";
import { useLayers } from "../contexts/UseLayers";

const LayerPanel: React.FC = () => {
  const { layers, activeLayerId, setActiveLayer, addLayer, setLayers } =
    useLayers();
  const [expandedLayerIds, setExpandedLayerIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) => ({
        ...layer,
        opacity: layer.id === activeLayerId ? 1 : 1 - layer.order * 0.1, // Adjust opacity based on active layer
      })),
    );
  }, [activeLayerId]);

  const handleOrderChange = (id: number, newOrder: number) => {
    if (layers.some((layer) => layer.order === newOrder && layer.id !== id)) {
      setError(`Order ${newOrder} is already taken.`);
      return;
    }
    setError(null);
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, order: newOrder } : layer,
      ),
    );
  };

  const handleVisibilityToggle = (id: number) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer,
      ),
    );
  };

  const handleNameChange = (id: number, newName: string) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, name: newName } : layer,
      ),
    );
  };

  const handleLayerClick = (id: number) => {
    setActiveLayer(id);
    setExpandedLayerIds(
      expandedLayerIds.includes(id)
        ? expandedLayerIds.filter((expId) => expId !== id)
        : [...expandedLayerIds, id],
    );
  };

  const handleAddLayer = () => {
    addLayer();
    const newId = layers.length + 1;
    setActiveLayer(newId);
    setExpandedLayerIds([newId]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const maxOrder = Math.max(...layers.map((layer) => layer.order));
      const activeLayer = layers.find((layer) => layer.id === activeLayerId);
      const opacity = activeLayer ? 1 : 1 - maxOrder / 10; // need to know if i take 10 or not
      canvas.style.opacity = `${opacity}`;
    }
  }, [layers, activeLayerId]);

  return (
    <div
      className="layer-panel"
      style={{ top: position.y, left: position.x, position: "fixed" }}
      onMouseDown={handleMouseDown}
    >
      <h2 className="layer-panel__title">Layers</h2>
      <button className="button__layers__add-option" onClick={handleAddLayer}>
        Add Layer
      </button>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {layers.map((layer) => (
          <li
            key={layer.id}
            className={layer.id === activeLayerId ? "active" : ""}
          >
            <div onClick={() => handleLayerClick(layer.id)}>
              {layer.name}
              <button className="expand-button">
                <span
                  className={
                    expandedLayerIds.includes(layer.id)
                      ? "arrow down"
                      : "arrow right"
                  }
                ></span>
              </button>
            </div>
            {expandedLayerIds.includes(layer.id) && (
              <div className="layer-details">
                <p>
                  Name:
                  <input
                    type="text"
                    value={layer.name}
                    onChange={(e) => handleNameChange(layer.id, e.target.value)}
                  />
                </p>
                <p>
                  Order:
                  <input
                    type="number"
                    value={layer.order}
                    onChange={(e) =>
                      handleOrderChange(layer.id, parseInt(e.target.value, 10))
                    }
                  />
                </p>
                <p>
                  <button onClick={() => handleVisibilityToggle(layer.id)}>
                    {layer.visible ? "Hide" : "Show"}
                  </button>
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerPanel;