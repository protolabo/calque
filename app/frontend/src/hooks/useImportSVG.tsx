import { useRef } from 'react';
import * as d3 from 'd3';
import { BaseType } from 'd3';

// Hook to handle SVG importing logic
const useImportSVG = (setSelectedEntity: React.Dispatch<BaseType | null>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to trigger the file input
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle file selection and read the content
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      if (fileName.includes('.calque')) {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
          const fileContent = e.target?.result as string;
          if (fileContent) {
            document.getElementById('Map')!.innerHTML = fileContent;
            d3.select('#Map')
              .selectAll('circle')
              .attr('og-fill', function () {
                return d3.select(this).attr('fill');
              })
              .attr('og-stroke', function () {
                return d3.select(this).attr('stroke');
              })
              .attr('id', function () {
                return d3.select(this).attr('data-id');
              })
              .on('mouseover', function () {
                return handleNodeMouseOver(d3.select(this));
              })
              .on('mouseout', function () {
                return handleNodeMouseOut(d3.select(this));
              })
              .on('click', function () {
                return setSelectedEntity(this);
              });

            d3.select('#Map')
              .selectAll('line')
              .attr('og-color', function () {
                return d3.select(this).attr('stroke');
              })
              .attr('id', function () {
                return d3.select(this).attr('data-id');
              })
              .on('mouseover', function () {
                return handleEdgeMouseOver(d3.select(this));
              })
              .on('mouseout', function () {
                return handleEdgeMouseOut(d3.select(this));
              })
              .on('click', function () {
                return setSelectedEntity(this);
              });

            d3.select('#Map')
              .selectAll('image')
              .attr('id', function () {
                return d3.select(this).attr('data-id');
              })
              .attr('og-opacity', function () {
                return d3.select(this).attr('opacity');
              })
              .on('mouseover', function () {
                return handleImageMouseOver(d3.select(this));
              })
              .on('mouseout', function () {
                return handleImageMouseOut(d3.select(this));
              })
              .on('click', function () {
                return setSelectedEntity(this);
              });
          }
        };

        fileReader.readAsText(file);
      } else {
        alert(`Ce n'est pas un fichier '.calque'. Veuillez choisir un fichier '.calque'.`);
      }
    }
  };

  return {
    fileInputRef,
    handleImportClick,
    handleFileChange,
  };
};

// Helper functions for mouse events (keep them separate for reuse)
const handleNodeMouseOver = (node: d3.Selection<BaseType, unknown, null, undefined>) => {
  node.transition().duration(200).attr('fill', 'orange').attr('stroke', 'red');
};

const handleEdgeMouseOver = (edge: d3.Selection<BaseType, unknown, null, undefined>) => {
  edge.transition().duration(200).attr('stroke', 'orange');
};

const handleImageMouseOver = (image: d3.Selection<BaseType, unknown, null, undefined>) => {
  image.transition().duration(200).attr('opacity', '0.5');
};

const handleNodeMouseOut = (node: d3.Selection<BaseType, unknown, null, undefined>) => {
  node
    .transition()
    .duration(200)
    .attr('fill', () => node.attr('og-fill'))
    .attr('stroke', () => node.attr('og-stroke'));
};

const handleEdgeMouseOut = (edge: d3.Selection<BaseType, unknown, null, undefined>) => {
  edge.transition().duration(200).attr('stroke', () => edge.attr('og-color'));
};

const handleImageMouseOut = (image: d3.Selection<BaseType, unknown, null, undefined>) => {
  image.transition().duration(200).attr('opacity', () => image.attr('og-opacity'));
};

export { useImportSVG };
