/*

This is is typescript logic only, no REACT in here

*/
import Node from "../models/node.ts";

export class System {

    //What is last interacted item on the canvas
    private static _focus : Node = new Node("test",0,0);

    constructor() {

    }



    public static get focus() : Node {
        return System._focus;
    }
    
    public static set focus(v : Node) {
        System._focus = v;
    }

}

export default System;
