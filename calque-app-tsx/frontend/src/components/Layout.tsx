import { Outlet } from "react-router-dom"
import {Navbar} from "./Navbar"
import Leftbar from "./Leftbar"
import Rightbar from "./Rightbar"
import Canvas from "./Canvas"
import Map from "./Map"
import System from "../services/System"
import React, { useEffect, useContext, useRef, createContext, useState } from 'react';


type Mode = "editor" | "preview"

const ModeContext = createContext<[Mode, React.Dispatch<Mode>]>(undefined as any);

function Layout() {

  const [mode, setMode] = useState<Mode>("editor")


  //hook that contains the reference of the canvas stored in <svg> in <Map/> component
  const canvasRef = useRef<SVGSVGElement | null>(null);

  return (
    <ModeContext.Provider value={[mode, setMode]}>
        <Navbar/>
        <div className="flex flex-row">
          <Leftbar/>
          <Canvas />
          <Rightbar/>
        </div>
        <Outlet/>
    </ModeContext.Provider> 
  )
}

export default Layout;
export {ModeContext}
