import React from "react";
import { useLayers } from "../../contexts/UseLayers.tsx";
const BottomBar: React.FC = () => {
  const { layers, addLayer, setActiveLayer, activeLayerId } = useLayers();

  return (
    <div>
      {layers.map((layer) => (
        <button
          key={layer.id}
          className={`button__layers ${layer.id == activeLayerId ? "button__layers--active" : ""}`}
          onClick={() => setActiveLayer(layer.id)}
        >
          {layer.name}
        </button>
      ))}
      <button className="button__layers__add-option" onClick={addLayer}>
        +
      </button>
    </div>
  );
};
export default BottomBar;
