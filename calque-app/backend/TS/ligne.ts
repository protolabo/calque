import { Duree } from "./edge";
import { Style } from "./style";

export class Ligne {
    private _name!: string;
    private _defaultDuree: Duree | undefined = undefined;
    private _style: Style = new Style("none", "black", 5);
    
    constructor(_name: string) {}
    
    public get name() : string {
        return this._name;
    }
    public get defaultDuree() : Duree | undefined {
        return this._defaultDuree;
    }
    public get style() : Style {
        return this._style;
    }
    
    public set name(v : string) {
        this._name = v;
    }
    public set defaultDuree(v: Duree | undefined) {
        this._defaultDuree = v;
    }
    public set style(v : Style) {
        this._style = v;
    }
}