import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Leftbar from "./Leftbar"
function Layout() {
  return (
    <div>
        <Navbar/>
        <Leftbar/>
        <Outlet/>
    </div> 
  )
}

export default Layout
