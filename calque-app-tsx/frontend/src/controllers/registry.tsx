import { Edge, Duree } from "../models/edge";
import { Ligne } from "../models/ligne";
import { Node } from "../models/node";
import { Style } from "../models/style";


export class Registry {
    private static instance: Registry;
    private _registry: Map<number, Node | Edge> = new Map;

    private constructor() {}

    static getInstance(): Registry {
        if (typeof this.instance === "undefined") {
            this.instance = new Registry;
        }
        return this.instance;
    }

    private getNextId(): number {
        let nextId: number | undefined;
        for (const key of this._registry.keys()) {
            if (typeof nextId === "undefined" || key > nextId!) {
                nextId = key;
            }
        }
        return (typeof nextId === "undefined") ? 0 : (nextId! + 1);
    }

    // get
    public get(key: number): Edge | Node | undefined {
        return this._registry.get(key);
    }

    // create node
    public createNode(): number {
        const id: number = this.getNextId();
        console.log(id)
        const node: Node = new Node("node " + id.toString(), id);
        this._registry.set(id, node);
        return id;
    }

    // create edge
    public createEdge(key1: number, key2: number, ligne: Ligne): number | undefined {
        const id: number = this.getNextId();
        const node1: Node | Edge | undefined = this.get(key1);
        const node2: Node | Edge | undefined = this.get(key2);
        if (typeof node1 !== "undefined" && typeof node2 !== "undefined" && Object.keys(node1).includes("_entrant") && Object.keys(node2).includes("_entrant")) {
            const edge: Edge = new Edge(id, "edge " + id.toString, (node1 as Node), (node2 as Node), ligne);
            this._registry.set(id, edge);
            this.updateNode({key:key1, addSortant:[edge]});
            this.updateNode({key:key2, addEntrant:[edge]});
            return id;
        }
        else {
            return undefined;
        }
    }

    // update node
    public updateNode({key, name, style, addEntrant, removeEntrant, addSortant, removeSortant}:
        {key: number,
            name?: string,
            style?: Style, 
            addEntrant?: Edge[], 
            removeEntrant?: Edge[], 
            addSortant?: Edge[], 
            removeSortant?: Edge[]
        }): void {

        let node: Node | Edge | undefined = this.get(key);
        if (typeof node !== "undefined" && Object.keys(node).includes("_entrant")) {
            node = (node as Node);
            if (typeof name !== "undefined") {
                node.name = name;
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

    // update edge
    public updateEdge({key, name, duree, style, isBlocked}:
        {key: number, 
            name?: string, 
            duree?: Duree, 
            style?: Style,
            isBlocked: boolean
        }): void {

        let edge: Node | Edge | undefined = this.get(key);
        if (typeof edge !== "undefined" && Object.keys(edge).includes("_ligne")) {
            edge = (edge as Edge);
            if (typeof name !== "undefined") {
                edge.name = name;
            }
            edge.duree = duree;
            edge.isBlocked = isBlocked;

            if (typeof style !== "undefined") {
                edge.style = style;
            }
        }
    }

    // delete node or edge
    public delete(key: number): number[] {
        const element = this.get(key);
        let removed: number[] = [];
        if (typeof element !== "undefined") {
            if (Object.keys(element).includes("_entrant")) {
                const node = (element as Node);
                for (const edge of node.entrant.concat(node.sortant)) {
                    removed = removed.concat(this.delete(edge.id))
                }
            }
            else {
                const edge = (element as Edge);
                const n1 = edge.node1;
                const n2 = edge.node2;
                this.updateNode({key:n1.id, removeSortant:[edge]});
                this.updateNode({key:n2.id, removeEntrant:[edge]});
            }
            this._registry.delete(key);
            removed.push(key);
        }
        return removed;
    }
}