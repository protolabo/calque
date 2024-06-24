import { Style } from "./style";

export class Node {
    private _name : string;
    private _posX : number;
    private _posY : number;
    private _style: Style = new Style("black", "none", 0);

    constructor(_name: string, _posX: number, _posY: number) {}

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