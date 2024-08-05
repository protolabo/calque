import { Link } from "react-router-dom";
import LogoIcon from "../assets/Logo.asset"
import { AiOutlinePlus } from "react-icons/ai";

function MainMenu() {
  return (
    <>
      <MenuNavbar/>
      <MenuCategories/>
      <MenuMap/>
    </>
  )
}

function MenuNavbar() {
  return(
    <div className="flex flex-row justify-between bg-primary p-2 items-center">
      <div className="flex flex-row items-center gap-2">
        <LogoIcon/>
        <div className="text-white">Calque</div>
      </div>
      <div className="flex">
        <div className="grow rounded-full bg-slate-100 w-full h-8 px-64 flex items-center">Search</div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="text-white">Camille</div>
        <div className="rounded-full w-8 h-8 bg-slate-100"></div>
      </div>
    </div>
  )
}

function MenuCategories() {
  return(
    <div className="flex flex-row justify-center gap-8 p-4">
      <div>My Maps</div>
      <div>Browse Maps</div>
    </div>
  )
}

function MenuSubCategories(){
  return(
    <div className="flex flex-row justify-evenly p-8">
      <div>All Maps</div>
      <div>Transit</div>
      <div>Shopping Centers</div>
      <div>Campuses</div>
      <div>Nature</div>
    </div>
  )
}

function MenuMapFile() {
  return (
    <div className="rounded-lg">
      <div className="flex justify-center items-center rounded-lg border-solid border-black border-2 w-80 h-48">
        Map img
      </div>
      <div className="mt-2">Map Title</div>
    </div>
  );
}

function AddMapButton() {
  return (
    <Link to="/">
      <div className="rounded-lg">
        <div className="border-2 flex justify-center items-center rounded-lg border-solid border-black w-80 h-48">
          <AiOutlinePlus className="w-12 h-12" />
        </div>
        <div className="mt-2">Text</div>
      </div>
    </Link>
    
  );
}

function MenuMap() {
  return (
    <div className="grid grid-cols-4 mx-8 gap-8">
      <AddMapButton />
      <MenuMapFile />

    </div>
  );
}

export { MenuNavbar, MenuMap, MenuCategories, MenuSubCategories, MenuMapFile, AddMapButton }
export default MainMenu