import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Leftbar from "./Leftbar"
import Rightbar from "./Rightbar"
import Canvas from "./Canvas"
import Map from "./Map"
function Layout() {
  return (
    <div>
        <Navbar/>
        <div className="flex flex-row">
          <Leftbar/>
          <Map/>
          <Rightbar/>
        </div>
        <Outlet/>
    </div> 
  )
}

export default Layout
