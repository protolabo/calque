import { Link } from "react-router-dom";
// import LogoIcon from "../assets/Logo.asset"
import { AiOutlinePlus } from "react-icons/ai";
import { useContext } from "react";
import { AppContext, GraphContext, SelectedEntityContext } from "../components/Layout";
import { emptyGraph } from "../models/graph";
import { resetState } from "../redux/localStorage";
import { BiImport } from "react-icons/bi";
import { PiGraph } from "react-icons/pi";

function MainMenu() {
  return (
    <>
      <MenuMap/>
    </>
  )
}

/*
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
  */

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
  const { setPage } = useContext(AppContext)
  return (
    <Link to={"/create-map"} onClick={() => setPage('creation')}>
      <div className="rounded-lg group hover:border-secondary">
        <div className="border-2 flex justify-center items-center rounded-lg border-solid border-black w-80 h-48 group-hover:border-secondary">
          <PiGraph className="w-12 h-12 group-hover:fill-secondary"/>
        </div>
        <div className="mt-2 group-hover:text-secondary">Untitled-1</div>
      </div>
    </Link>
  );
}

function MenuImportMap() {
  const { setPage } = useContext(AppContext)
  return (
    <Link to={"/map"} onClick={() => {setPage('creation')}}>
      <div className="rounded-lg group hover:border-secondary">
        <div className="border-2 flex justify-center items-center rounded-lg border-solid border-black w-80 h-48 group-hover:border-secondary">
          <BiImport className="w-12 h-12 group-hover:fill-secondary"/>
        </div>
        <div className="mt-2 group-hover:text-secondary">Import an existing .calque map</div>
      </div>
    </Link>
  );
}

function AddMapButton() {
  const { setPage } = useContext(AppContext)
  const { setGraph } = useContext(GraphContext)
  const { setSelectedEntity } = useContext(SelectedEntityContext)

  const handleClick = () => {
    console.log("Resetting graph state to emptyGraph:", emptyGraph);
    setSelectedEntity(null);
    resetState();
    setGraph(emptyGraph); 
    setPage('creation');
  };
  
  return (
    <Link 
      to="/create-map" 
      onClick={handleClick}>
      <div className="rounded-lg group hover:border-secondary">
        <div className="border-2 flex justify-center items-center rounded-lg border-solid border-black w-80 h-48 group-hover:border-secondary">
          <AiOutlinePlus className="w-12 h-12 group-hover:fill-secondary" />
        </div>
        <div className="mt-2 group-hover:text-secondary">Create a new map</div>
      </div>
    </Link>
    
  );
}

function MenuMap() {
  return (
    <div className="flex flex-row justify-evenly justify-center mx-8 gap-8 mt-12">
      <AddMapButton />
      <MenuMapFile />
      <MenuImportMap />
    </div>
  );
}

export { MenuImportMap, MenuMap, MenuCategories, MenuSubCategories, MenuMapFile, AddMapButton }
export default MainMenu