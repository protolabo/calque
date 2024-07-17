import Map2 from "../components/Map2"
import Map3 from "../components/Map3"

import { useState } from "react"

/**
 * Preview qui trace un chemin de Laurier à Parc
 */

interface mapProps {
  clickMap: () => void;
}

const ReturnMap2: React.FC<mapProps> = (props) => {
  return (
    <div>
      <button onClick={props.clickMap}><Map2 /></button>
    </div>
  );
};

function Preview() {

  const [mapClicked, setMapClicked] = useState<boolean>(true);

  function clickMap() {
    setMapClicked(!mapClicked)
  }

  return (
    
    mapClicked ? <ReturnMap2 clickMap={clickMap} /> : <Map3 />
     
    
  );
}

export default Preview