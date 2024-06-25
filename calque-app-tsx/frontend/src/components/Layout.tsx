import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Leftbar from "./Leftbar"
import Rightbar from "./Rightbar"
import Canvas from "./Canvas"
function Layout() {
  return (
    <div>
        <Navbar/>
        <div className="grid-flow-row">
          <Leftbar/>
          <Canvas/>
          <Rightbar/>
        </div>
        <Outlet/>
    </div> 
  )
}

export default Layout
