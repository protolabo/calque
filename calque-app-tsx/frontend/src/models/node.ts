import { Style, CircleStyle } from "./style";
import { Edge } from "./edge";

export class Node {
    private _name! : string;
    private _style!: Style;
    private _entrant: Edge[] = [];
    private _sortant: Edge[] = [];
    private readonly _id! : string;

    constructor(name: string, id: string, style: Style = new CircleStyle()) {
        this._name = name;
        this._id = id;
        this._style = style;
    }

    public get name() : string {
        return this._name;
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
    public get id() : string {
        return this._id;
    }

    public set name(v : string) {
        this._name = v;
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
