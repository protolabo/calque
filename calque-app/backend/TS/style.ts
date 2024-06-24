export class Style {
    private _fill: string;
    private _stroke: string;
    private _strokeWidth: number;
    private _opacity: number = 1;

    constructor(_fill: string, _stroke: string, _strokeWidth: number) {}

    
    public get fill() : string {
        return this._fill;
    }
    public get stroke() : string {
        return this._stroke;
    }
    public get strokeWidth() : number {
        return this._strokeWidth;
    }
    public get opacity() : number {
        return this._opacity;
    }
    
    public set fill(v : string) {
        this._fill = v;
    }
    public set stroke(v : string) {
        this._stroke = v;
    }
    public set strokeWidth(v : number) {
        this._strokeWidth = v;
    }
    public set opacity(v : number) {
        this._opacity = v;
    }
}