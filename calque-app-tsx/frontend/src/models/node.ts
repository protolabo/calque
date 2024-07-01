import { Style } from "./style";

export class Node {
    private _name! : string;
    private _posX! : number;
    private _posY! : number;
    private _id! : number;
    private _style: Style = new Style("black", "none", 0);

    constructor(name: string, posX: number, posY: number) {
        this._name = name;
        this._posX = posX;
        this._posY = posY;
        this._id = Math.floor(Math.random() * 10000); // to delete
        this._style = new Style("black", "none", 0); // Default style
    }

    public get name() : string {
        return this._name;
    }
    public get posX() : number {
        return this._posX;
    }
    public get posY() : number {
        return this._posY;
    }
    public get style() : Style {
        return this._style;
    }
    
    public get id() : number {
        return this._id;
    }
    
    public set id(v : number) {
        this._id = v;
    }

    public set name(v : string) {
        this._name = v;
    }
    public set posX(v : number) {
        this._posX = v;
    }
    public set posY(v : number) {
        this._posY = v;
    }
    public set style(v : Style) {
        this._style = v;
    }
}

export default Node;