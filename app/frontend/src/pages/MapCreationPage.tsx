import Canvas from "../components/Canvas";
import Bottombar from "../components/bottombar/Bottombar.tsx";
import Leftbar from "../components/leftbar/Leftbar";
import Rightbar from "../components/rightbar/Rightbar";
import { useSize } from "../contexts/SizeContext.tsx";
// import { AppContext } from "../components/Layout"

function MapCreationPage() {
  const { size } = useSize();
  return (
    <div className={`creation-page__container size-${size}`}>
      <div className="flex flex-row">
        <Leftbar />
        <Canvas />
        <Rightbar />
      </div>
      <Bottombar />
    </div>
  );
}

export default MapCreationPage;
