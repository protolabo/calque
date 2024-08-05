import { CgImport } from "react-icons/cg";
import LogoIcon from "../assets/Logo.asset"
import React, { useRef, useState } from 'react';
import * as d3 from "d3";
import { BaseType } from "d3";

function UserNavBar() {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
                setSelectedFile(file);
                const fileReader = new FileReader();

                fileReader.onload = (e) => {
                    const fileContent = e.target?.result as string;
                    setSvgContent(fileContent);
                    setTimeout(() => {
                        if (fileContent) {
                            document.getElementById('Map')!.innerHTML = fileContent;
                            d3.select('#Map')
                                .selectAll('circle')
                                .attr('og-fill', function() { return d3.select(this).attr('fill') })
                                .attr('og-stroke', function() { return d3.select(this).attr('stroke')})
                                .on('mouseover', function() {return handleNodeMouseOver(d3.select(this))})
                                .on('mouseout', function() {return handleNodeMouseOut(d3.select(this))})
                                .on('click', function() {return handleNodeClick(d3.select(this))});

                            d3.select('#Map')
                                .selectAll('line')
                                .attr('og-color', function() { return d3.select(this).attr('stroke') })
                                .on('mouseover', function() {return handleEdgeMouseOver(d3.select(this))})
                                .on('mouseout', function() {return handleEdgeMouseOut(d3.select(this))})
                                .on('click', function() {return handleEdgeClick(d3.select(this))});
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

    const handleNodeClick = (node: d3.Selection<BaseType, unknown, null, undefined>) => {}

    const handleEdgeClick = (edge: d3.Selection<BaseType, unknown, null, undefined>) => {}

    return (
      <div>
        <div className="flex flex-row justify-between bg-primary p-2 items-center">
            <div className="flex flex-row items-center gap-2">
            <LogoIcon/>
            <div className="text-white">Calque</div>
            </div>
            <div className="flex justify-center grow">
                <div className="text-white flex gap-2 items-center font-bold text-xl px-1">
                <div>Carte-globale</div>
                <div>/</div>
                <div>Sous-carte-1</div>
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
        <div id="Map"></div>
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
        <div>
            <svg width={800} height={100}>
                <circle cx={300} cy={50} r={10} fill="pink" stroke="red" strokeWidth={5} />
            </svg>
        </div>
    )
}

function EndUserPage() {

    return (
        <>
            <UserNavBar />
            <MapSVG />
        </>
    )
  }
  
  export default EndUserPage