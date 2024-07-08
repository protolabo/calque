/*

This is is typescript logic only, no REACT in here

*/
import {Style,CircleStyle,RectangleStyle} from "../models/style.ts";
import {Edge} from "../models/edge.ts";
import Node from "../models/node.ts";
import Command  from "./../commands/commandInterface";


export class System {

    //What is last interacted item on the canvas
    private static _focus : Node | Edge = new Node("test",32);
    private static _selection : (Node | Edge)[];
    //
    private static _activeTool : Command;
    //
    private static _canvas : SVGSVGElement | null = null;
    //
    private static _mouse: { [key: string]: number } = {};
    //
    private static _defaultStyle : Style = new CircleStyle()
    private static _selectedStyle : Style | null = null;





    constructor() {

    }




    public static set removeFromSelection(v:(Node | Edge)[]) {
        //filters the selection array by removing instances of Nodes and Edges from the list
        System._selection = System._selection.filter(e => !v.includes(e));
        }


    public static set addToSelection(v:(Node | Edge)[]) {
        //Via spread operator = destructuring
        System._selection = [ ...System._selection, ...v];
    }

    public static get selection() : (Node | Edge)[] {
        return System._selection;
    }
    
    public static set selection(v:(Node | Edge)[]) {
        System._selection = v;
    }


    public static get focus() : Node | Edge {
        return System._focus;
    }
    
    public static set focus(v : Node | Edge) {
        System._focus = v;
    }

    public static get canvas() : SVGSVGElement| null{
        return System._canvas;
    }
    
    public static set canvas(v : SVGSVGElement| null) {
        System._canvas = v;
        console.log(this._canvas)
        console.log(":)")
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


    public static set defaultStyle(v: Style) {
        System.defaultStyle = v;
    }

    public static get defaultStyle() : Style {
        return System._defaultStyle;
    }

    public static set selectedStyle(v: Style) {
        System._selectedStyle = v;
    }

    public static get selectedStyle() : Style | null {
        return System._selectedStyle;
    }
}

export default System;
