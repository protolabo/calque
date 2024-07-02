/*

This is is typescript logic only, no REACT in here

*/
import {Edge} from "../models/edge.ts";
import Node from "../models/node.ts";

export class System {

    //What is last interacted item on the canvas
    private static _focus : Node | Edge = new Node("test",0,0);
    private static _selection : (Node | Edge)[];

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

}

export default System;
