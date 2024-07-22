import { Duree } from "./edge";
import { Style } from "./style";

export class Ligne {
    private _name!: string;
    private _defaultDuree: Duree | undefined = undefined;
    private _style: Style | null= null;
    
    constructor(_name: string) {}
    
    public get name() : string {
        return this._name;
    }
    public get defaultDuree() : Duree | undefined {
        return this._defaultDuree;
    }
    public get style() : Style | null{
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