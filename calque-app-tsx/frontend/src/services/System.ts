/*

This is is typescript logic only, no REACT in here

*/
import {Style,CircleStyle,EdgeStyle} from "../models/style.ts";
import { Edge } from "../models/edge.ts";
import { Node } from "../models/node.ts";
import Command  from "./../commands/commandInterface";
import CanvasController from "../controllers/canvas.controller.ts";
import { Registry } from "../controllers/registry.tsx";

export class System {

    //What is last interacted item on the canvas
    private static _focus : string | null;
    private static _selection : (string)[];
    //
    private static _activeTool : Command;
    //
    private static _canvas : SVGSVGElement | null = null;
    //
    private static _mouse: { [key: string]: number } = {};
    //
    private static _defaultNodeStyle : Style = new CircleStyle()
    private static _defaultEdgeStyle : Style = new EdgeStyle()
    private static _selectedStyle : Style | null = null;
    //
    private static _canvasController : CanvasController | null;
    //
    private static _registry : Registry = Registry.getInstance()





    constructor() {

    }




    public static set removeFromSelection(v:(string)[]) {
        //filters the selection array by removing instances of Nodes and Edges from the list
        System._selection = System._selection.filter(e => !v.includes(e));
        }


    public static set addToSelection(v:(string)[]) {
        //Via spread operator = destructuring
        System._selection = [ ...System._selection, ...v];
    }

    public static get selection() : string[] {
        return System._selection;
    }
    
    public static set selection(v:string[]) {
        System._selection = v;
    }


    public static get focus() : string|null {
        return System._focus;
    }
    
    public static set focus(v : string | null) {
        System._focus = v;
    }

    public static get canvas() : SVGSVGElement| null{
        return System._canvas;
    }
    
    public static set canvas(v : SVGSVGElement| null) {
        System._canvas = v;
        if (System._canvas){
            System._canvasController = new CanvasController(System._canvas)
        }
        console.log(this._canvas)
    }

    public static set activeTool(v : Command) {
        console.log(v)
        System._activeTool?.onLeave();
        System._activeTool = v;
        System._activeTool?.onLoad();
    }

    public static get activeTool() : Command{
        return System._activeTool;
    }

    public static set mouse(v: { [key: string]: number }) {
        System._mouse = v;
    }

    public static get mouse() : { [key: string]: number }{
        return System._mouse;
    }


    public static set defaultNodeStyle(v: Style) {
        System._defaultNodeStyle = v;
    }

    public static get defaultNodeStyle() : Style {
        return System._defaultNodeStyle;
    }

    public static set defaultEdgeStyle(v: Style) {
        System._defaultEdgeStyle = v;
    }

    public static get defaultEdgeStyle() : Style {
        return System._defaultEdgeStyle;
    }

    public static set selectedStyle(v: Style) {
        System._selectedStyle = v;
    }

    public static get selectedStyle() : Style | null {
        return System._selectedStyle;
    }

    public static set canvasController(v: CanvasController) {
        System._canvasController = v;
    }

    public static get canvasController() : CanvasController | null {
        return System._canvasController;
    }

    public static get registry() : Registry {
        return System._registry;
    }


    public static getNodeFromSelection(): string[] {
        const listNodes : string[] = []
        //
        this._selection.forEach((id)=>{
            //
            const object = System.registry.get(id as unknown as number)
            if(object instanceof Node){
                listNodes.push(id)}
        })
        return listNodes
    }

    public static getEdgeFromSelection(): string[] {
        const listEdges: string[] = [];
        
        this._selection.forEach((id) => {
        //
            const object = System.registry.get(id as unknown as number)
            if (object instanceof Edge) {
                listEdges.push(id) }
        })
        return listEdges
    }
}

export default System;
