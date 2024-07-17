
import React, { useEffect, useRef, forwardRef } from 'react';
import System from '../services/System';
const Canvas = forwardRef<SVGSVGElement, {}>((props, ref) => {
  const localRef = useRef<SVGSVGElement | null>(null);






const d3Tags = ["a",
"animate",
"animateMotion",
"animateTransform",
"circle",
"clipPath",
"defs",
"desc",
"ellipse",
"feBlend",
"feColorMatrix",
"feComponentTransfer",
"feComposite",
"feConvolveMatrix",
"feDiffuseLighting",
"feDisplacementMap",
"feDistantLight",
"feDropShadow",
"feFlood",
"feFuncA",
"feFuncB",
"feFuncG",
"feFuncR",
"feGaussianBlur",
"feImage",
"feMerge",
"feMergeNode",
"feMorphology",
"feOffset",
"fePointLight",
"feSpecularLighting",
"feSpotLight",
"feTile",
"feTurbulence",
"filter",
"foreignObject",
"g",
"hatch",
"hatchpath",
"image",
"line",
"linearGradient",
"marker",
"mask",
"metadata",
"mpath",
"path",
"pattern",
"polygon",
"polyline",
"radialGradient",
"rect",
"script",
"set",
"stop",
"style",
"svg",
"switch",
"symbol",
"text",
"textPath",
"title",
"tspan",
"use",
"view"]

const d3Elements = [
"a",
"circle",
"ellipse",
"image",
"line",
"path",
"polygon",
"polyline",
"rect",
"text",
"foreignObject",
"g",
"svg",
"switch",
"symbol",
"use"]




//Currently toggled off :
  const handleClick = (event : React.MouseEvent<SVGSVGElement>) => {
    console.log('Canvas clicked!');

    const mouseProperties = {
      clientX: event.clientX,
      clientY: event.clientY,
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
      pageX: event.pageX,
      pageY: event.pageY,
      screenX: event.screenX,
      screenY: event.screenY,
      //...
      };

    System.mouse = mouseProperties;
    System.activeTool?.execute()
  };






  //will update the system upon rerendering of the component
  useEffect(() => {
    if (ref && typeof ref === 'object' && ref !== null) {
      ref.current = localRef.current;
    }
    System.canvas=(localRef.current);

  }, [ref]);

  return (
      <div className="flex grow justify-center bg-slate-400">
        <div className='bg-slate-100'>
          <svg 
            ref={localRef} 
            id="canvas" 
            //onClick={handleClick}
            className='relative z-20'
            width="920"
            height="938" 
            viewBox="0 0 920 938" 
            fill="white" 
            xmlns="http://www.w3.org/2000/svg">
          </svg>
        </div>
        
      </div>
    );
  });

export default Canvas;
