import { Node } from './node.js';
import { Ligne } from './ligne.js';
import { Style } from './style.js';

export class Edge {
    name: string;
    node1: Node;
    node2: Node;
    ligne: Ligne;
    duree: Duree | undefined;
    style: Style = new Style("none", "black", 5);
    isBlocked: boolean = false;

    constructor(name: string, node1: Node, node2: Node, ligne: Ligne, duree: Duree | undefined = undefined) {}

    swapBlockState(): void {
        if (this.isBlocked) {
            this.isBlocked = false
        }
        else {
            this.isBlocked = true
        }
    }
}

export type Duree = {heure: string | undefined, minute: string | undefined};