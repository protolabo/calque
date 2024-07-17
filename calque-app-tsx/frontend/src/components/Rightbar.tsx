import { useContext } from "react";

import NodeEditor from "./NodeEditor"
import { ModeContext } from "./Layout";

function Rightbar() {
  const [mode, _] = useContext(ModeContext);

  return (
    
    
    <div className="sticky flex-1 right-0 top-0 w-64 bg-secondary fixed  grid z-40  h-screen transition-transform -translate-x-full sm:translate-x-0">
      {mode === "editor" && <NodeEditor/>}
      {mode === "preview" && <div></div>}
    </div>
    
  )}

export default Rightbar;