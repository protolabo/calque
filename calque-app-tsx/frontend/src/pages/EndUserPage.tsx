import { CgImport } from "react-icons/cg";
import LogoIcon from "../assets/Logo.asset"
import React, { createContext, useContext, useRef, useState } from 'react';
import * as d3 from "d3";
import { BaseType } from "d3";
import { Link } from "react-router-dom";
//import { Entity, SelectedEntityContext } from "../components/Layout";

/**
 * Essayez d'importer tresorcarte.calque qui se trouve dans /public
 */

interface SelectedEntityHandler {
    selectedEntity: BaseType | null;
    setSelectedEntity: React.Dispatch<BaseType | null>
}

const SelectedEntityContext = createContext<SelectedEntityHandler>(undefined as any);

function UserNavBar(setSelectedEntity: React.Dispatch<React.SetStateAction<BaseType | null>>) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    //const [ selectedEntity, setSelectedEntity ] = useState<Entity | null>(null);


    // Function to handle button click and trigger file input
    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Function to handle file selection and read SVG content
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileName = file.name;
            if (fileName.includes('.calque')) {
                const fileReader = new FileReader();

                fileReader.onload = (e) => {
                    const fileContent = e.target?.result as string;
                    setTimeout(() => {
                        if (fileContent) {
                            document.getElementById('Map')!.innerHTML = fileContent;
                            d3.select('#Map')
                                .selectAll('circle')
                                .attr('og-fill', function() { return d3.select(this).attr('fill') })
                                .attr('og-stroke', function() { return d3.select(this).attr('stroke')})
                                .attr('id', function() { return d3.select(this).attr('data-id')})
                                .on('mouseover', function() {return handleNodeMouseOver(d3.select(this))})
                                .on('mouseout', function() {return handleNodeMouseOut(d3.select(this))})
                                .on('click', function() {return setSelectedEntity(this)});

                            d3.select('#Map')
                                .selectAll('line')
                                .attr('og-color', function() { return d3.select(this).attr('stroke') })
                                .attr('id', function() { return d3.select(this).attr('data-id')})
                                .on('mouseover', function() {return handleEdgeMouseOver(d3.select(this))})
                                .on('mouseout', function() {return handleEdgeMouseOut(d3.select(this))})
                                .on('click', function() {return setSelectedEntity(this)});

                            d3.select('#Map')
                                .selectAll('image')
                                .attr('id', function() { return d3.select(this).attr('data-id')})
                                .attr('og-opacity', function() { return d3.select(this).attr('opacity') })
                                .on('mouseover', function() {return handleImageMouseOver(d3.select(this))})
                                .on('mouseout', function() {return handleImageMouseOut(d3.select(this))})
                                .on('click', function() {return setSelectedEntity(this)});
                        }
                    }, 0);
                };

                fileReader.readAsText(file);
            }
            else alert(`Ce n'est pas un fichier '.calque'. Veuillez choisir un fichier '.calque'.`);
        }
    };

    const handleNodeMouseOver = (node: d3.Selection<BaseType, unknown, null, undefined>) => {
        node.transition()
            .duration(200)
            .attr('fill', 'orange')
            .attr('stroke', 'red');
    }

    const handleEdgeMouseOver = (edge: d3.Selection<BaseType, unknown, null, undefined>) => {
        edge.transition()
            .duration(200)
            .attr('stroke', 'orange');
    }
    const handleImageMouseOver = (image: d3.Selection<BaseType, unknown, null, undefined>) => {
      image.transition()
          .duration(200)
          .attr('opacity', '0.5');
  }

    const handleNodeMouseOut = (node: d3.Selection<BaseType, unknown, null, undefined>) => {
        node.transition()
            .duration(200)
            .attr('fill', () => node.attr('og-fill'))
            .attr('stroke', () => node.attr('og-stroke'));
    }

    const handleEdgeMouseOut = (edge: d3.Selection<BaseType, unknown, null, undefined>) => {
        edge.transition()
            .duration(200)
            .attr('stroke', () => edge.attr('og-color'))
    }

    const handleImageMouseOut = (image: d3.Selection<BaseType, unknown, null, undefined>) => {
      image.transition()
          .duration(200)
          .attr('opacity', () => image.attr('og-opacity'))
  }

    /*const handleNodeClick = (node: d3.Selection<BaseType, unknown, null, undefined>) => {
        setSelectedEntity({ kind: 'node', id: node.attr('id') as unknown as number ?? 0 }); // TODO mieux gérer les id
    }

    const handleEdgeClick = (edge: d3.Selection<BaseType, unknown, null, undefined>) => {
        setSelectedEntity({ kind: 'edge', id: edge.attr('id') as unknown as number ?? 0 }); // TODO mieux gérer les id

    }*/

    return (
      <div>
        <div className="flex flex-row justify-between bg-primary p-2 items-center">
            <div className="flex flex-row items-center gap-2">
            <Link to={"/"}><LogoIcon/></Link>
            </div>
            <div className="flex justify-center grow">
                <div className="text-white flex gap-2 items-center font-bold text-xl px-1">
                <div>Utiliser une carte calque déjà existante</div>
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center text-white">
                <button className='flex items-center bg-blue-500 px-4 py-1 rounded-lg gap-2 text-lg hover:bg-blue-600'
                    onClick={handleImportClick}>
                    Import
                    <CgImport className='w-6 h-6'/>
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
        
        {/*svgContent && (
            <div className="importedSVG"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ border: '1px solid black', marginTop: '10px'}}
            />
        )*/}
      </div>
    )
}

function MapSVG() {
    return (
        <div id="Map" className="basis-5/6"></div>
    )
}

function RightBar() {
    const { selectedEntity } = useContext(SelectedEntityContext);
    let description: string;
    if (selectedEntity) {
        description = d3.select(selectedEntity)
                        .attr('data-description');
    }
    else description = '';
    return (
        <div className="sticky basis-1/6 w-64 top-0 right-0 bg-secondary fixed z-40 h-screen transition-transform -translate-x-full sm:translate-x-0">
        {selectedEntity !== null && (
          <>
            <div className="m-2 mt-8 font-bold text-center">{description}</div>
          </>
        )}
        </div>        
    );
}

function EndUserPage() { // TODO style
    const [selectedEntity, setSelectedEntity] = useState<BaseType | null>(null);

    return (
        <>
            <SelectedEntityContext.Provider value={{ selectedEntity, setSelectedEntity }}>
                {UserNavBar(setSelectedEntity)}
                <div className="flex flex-row">
                    <MapSVG />
                    <RightBar />
                </div>
            </SelectedEntityContext.Provider>
        </>
    )
  }
  
  export default EndUserPage