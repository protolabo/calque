import { Edge } from "../models/edge";
import { Ligne } from "../models/ligne";
import { Node } from "../models/node";
import { Style } from "../models/style";


export class Dictionnaire {
    private static instance: Dictionnaire;
    private _registre: Map<number, Node | Edge> = new Map;

    private constructor() {}

    static getInstance(): Dictionnaire {
        if (typeof this.instance === "undefined") {
            this.instance = new Dictionnaire;
        }
        return this.instance;
    }

    private getNextId(): number {
        let nextId: number | undefined;
        for (const key of this._registre.keys()) {
            if (typeof nextId === undefined || key > nextId!) {
                nextId = key;
            }
        }
        return typeof nextId === undefined ? 0 : nextId! + 1;
    }

    // get
    public get(key: number): Edge | Node | undefined {
        return this._registre.get(key);
    }

    // create node
    public createNode(): number {
        const id: number = this.getNextId();
        const node: Node = new Node("node " + id.toString(), 100, 100);
        this._registre.set(id, node);
        return id;
    }

    // update node
    public updateNode({key, name, posX, posY, style, addEntrant, removeEntrant, addSortant, removeSortant}:
        {key: number,
            name?: string,
            posX?: number, 
            posY?: number, 
            style?: Style, 
            addEntrant?: Edge[], 
            removeEntrant?: Edge[], 
            addSortant?: Edge[], 
            removeSortant?: Edge[]}) {

        let node: Node | Edge | undefined = this.get(key);
        if (typeof node !== "undefined" && Object.keys(node).includes("_entrant")) {
            node = (node as Node);
            if (typeof name !== "undefined") {
                node.name = name;
            }
            if (typeof posX !== "undefined") {
                node.posX = posX;
            }
            if (typeof posY !== "undefined") {
                node.posY = posY;
            }
            if (typeof style !== "undefined") {
                node.style = style;
            }
            if (typeof addEntrant !== "undefined") {
                for (const edge of addEntrant) {
                    node.addEntrant(edge);
                }
            }
            if (typeof removeEntrant !== "undefined") {
                for (const edge of removeEntrant) {
                    node.removeEntrant(edge);
                }
            }
            if (typeof addSortant !== "undefined") {
                for (const edge of addSortant) {
                    node.addSortant(edge);
                }
            }
            if (typeof removeSortant !== "undefined") {
                for (const edge of removeSortant) {
                    node.removeSortant(edge);
                }
            }
        }
    }
}