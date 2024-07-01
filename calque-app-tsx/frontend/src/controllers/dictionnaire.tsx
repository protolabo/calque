import { Node } from "../../../backend/src/models/to_move/node";


export class Dictionnaire {
    private static instance: Dictionnaire;
    private _registre: Map<number, Node> = new Map;

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

    // create node
    public createNode(): number {
        const id: number = this.getNextId();
        const node: Node = new Node("node " + id.toString(), 100, 100);
        this._registre.set(id, node);
        return id;
    }
}