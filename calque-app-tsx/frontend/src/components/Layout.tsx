import { Outlet } from "react-router-dom"
import {Navbar} from "./Navbar"
import Leftbar from "./Leftbar"
import Rightbar from "./Rightbar"
import Canvas from "./Canvas"
import Map from "./Map"
import System from "../services/System"
import React, { useEffect, useRef } from 'react';

function Layout() {

    //hook that contains the reference of the canvas stored in <svg> in <Map/> component
    const canvasRef = useRef<SVGSVGElement | null>(null);


  return (
    <div>
        <Navbar/>
        <div className="flex flex-row">
          <Leftbar/>
          <Canvas />
          <Rightbar/>
        </div>
        <Outlet/>
    </div> 
  )
}

export default Layout
