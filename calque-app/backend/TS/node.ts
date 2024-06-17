import { Style } from "./style";

export class Node {
    name : string;
    posX : number;
    posY : number;
    style: Style = new Style("black", "none", 0);

    constructor(name: string, posX: number, posY: number) {}
}