import Canvas from "../components/Canvas"
import Leftbar from "../components/leftbar/Leftbar"
import Rightbar from "../components/rightbar/Rightbar"
// import { AppContext } from "../components/Layout"

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