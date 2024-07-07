import { Style, CircleStyle } from "./style";
import { Edge } from "./edge";

export class Node {
    private _name! : string;
    private _posX! : number;
    private _posY! : number;
    private _style: Style = new CircleStyle();
    private _entrant: Edge[] = [];
    private _sortant: Edge[] = [];
    private readonly _id! : number;

    constructor(name: string, posX: number, posY: number, id: number) {
        this._name = name;
        this._posX = posX;
        this._posY = posY;
        this._id = id;
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
    public get entrant() : Edge[] {
        return this._entrant;
    }
    public get sortant() : Edge[] {
        return this._sortant;
    }
    public get id() : number {
        return this._id;
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
    
    public addEntrant(v : Edge) {
        this._entrant.push(v);
    }
    public addSortant(v: Edge) {
        this._sortant.push(v);
    }
    public removeEntrant(v : Edge) {
        this._entrant.splice(this._entrant.indexOf(v), 1);
    }
    public removeSortant(v : Edge) {
        this._sortant.splice(this._sortant.indexOf(v), 1);
    }
}

export default Node;
