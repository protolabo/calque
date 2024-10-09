import Canvas from "../components/Canvas"
import Leftbar from "../components/leftbar/Leftbar"
import Rightbar from "../components/rightbar/Rightbar"
import LayerPanel from "../components/LayerPanel.tsx";
// import { AppContext } from "../components/Layout"

function MapCreationPage() {
  return (
    <div className="flex flex-row">
            <Leftbar />
            <LayerPanel />
            <Canvas />
            <Rightbar />
          </div>
  )
}

export default MapCreationPage