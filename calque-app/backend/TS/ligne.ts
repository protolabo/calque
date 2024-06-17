import { Duree } from "./edge";
import { Style } from "./style";

export class Ligne {
    name: string;
    defaultDuree: Duree | undefined = undefined;
    style: Style = new Style("none", "black", 5);
    
    constructor(name: string) {}

    setDefaultDuree(duree: Duree | undefined): void {
        this.defaultDuree = duree;
    }
}