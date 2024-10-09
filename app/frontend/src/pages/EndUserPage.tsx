import { CgImport } from "react-icons/cg";
import LogoIcon from "../assets/Logo.asset"
import React, { createContext, useContext, useState } from 'react';
import * as d3 from "d3";
import { BaseType } from "d3";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useImportSVG } from '../hooks/useImportSVG'; // Import the custom hook

/**
 * Essayez d'importer tresorcarte.calque qui se trouve dans /public
 */

interface SelectedEntityHandler {
    selectedEntity: BaseType | null;
    setSelectedEntity: React.Dispatch<BaseType | null>
}

const SelectedEntityContext = createContext<SelectedEntityHandler>(undefined as any);

interface UserNavBarProps {
    setSelectedEntity: React.Dispatch<React.SetStateAction<d3.BaseType | null>>;
  }

const UserNavBar: React.FC<UserNavBarProps> = ({ setSelectedEntity }) => {
    const { fileInputRef, handleImportClick, handleFileChange } = useImportSVG(setSelectedEntity);
  
    return (
      <div className="fixed w-screen z-50">
        <div className="flex flex-row justify-between bg-primary p-2 items-center">
          <div className="flex flex-row items-center gap-2">
            <Link to={"/"}>
              <LogoIcon />
            </Link>
          </div>
          <div className="flex justify-center grow">
            <div className="text-white flex gap-2 items-center font-bold text-xl px-1">
              <div>Interact with an existing map</div>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center text-white">
            <button
              className="flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg hover:bg-blue-600"
              onClick={handleImportClick}
            >
              Import
              <CgImport className="w-6 h-6" />
            </button>
            <input
              type="file"
              accept=".svg"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    );
  };
  

function MapSVG() {
    return (
        <div id="Map" className="basis-4/6 z-30"></div>
    )
}

function LeftBar() {
    return(
        <div className="sticky shrink-0 basis-1/6 top-0 fixed w-64 pt-12 left-0 bg-secondary z-40 h-screen sm:translate-x-0">
            {/**sticky shrink-0 basis-1/6 w-64 top-0 bg-secondary fixed z-40 h-screen sm:translate-x-0 pt-12 */}
            <div className="mx-4 mt-8">Click on "Import" to import an existing .calque map.</div>
            <div className="mx-4 mt-8">It will appear on the white canvas!</div>
        </div>
    )
}

function RightBar() {
    const { selectedEntity } = useContext(SelectedEntityContext);
    let description: string;
    if (selectedEntity) {
        description = d3.select(selectedEntity)
                        .attr('data-description');
    }
    else description = 'Entity description goes here';
    return (
        <div className="shrink-0 sticky basis-1/6 w-64 top-0 right-0 bg-secondary fixed z-40 h-screen sm:translate-x-0 pt-12">
        {selectedEntity !== null && (
          <>
            <div className="m-2 mt-8 font-bold text-center">{description}</div>
          </>
        )}
        {selectedEntity === null && (
            <>
                <div className="m-2 mt-8 font-bold text-center">Description goes here</div>
            </>
        )}
        </div>        
    );
}

const MiddleContent = () => {
    return(
        <div className="flex flex-row">
            <LeftBar />
            <MapSVG />
            <RightBar />
        </div>
    )
}

function EndUserPage() { 
    const [selectedEntity, setSelectedEntity] = useState<BaseType | null>(null);

    return (
        <>
            <SelectedEntityContext.Provider value={{ selectedEntity, setSelectedEntity }}>
                <div className="grid grid-row-3">
                    <UserNavBar setSelectedEntity={setSelectedEntity} />
                    <MiddleContent/>
                    <Footer/>   
                </div>         
            </SelectedEntityContext.Provider>
        </>
    )
  }
  
  export default EndUserPage