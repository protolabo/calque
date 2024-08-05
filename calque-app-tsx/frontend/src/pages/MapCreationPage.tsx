import Canvas from "../components/Canvas"
import Leftbar from "../components/Leftbar"
import Rightbar from "../components/Rightbar"
import { AppContext } from "../components/Layout"

function MapCreationPage() {
  return (
    <div className="flex flex-row">
            <Leftbar />
            <Canvas />
            <Rightbar />
          </div>
  )
}

export default MapCreationPage