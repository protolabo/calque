
import { Edge, Duree } from "../models/edge";
import { Ligne } from "../models/ligne";
import { Node } from "../models/node";
import { Style } from "../models/style";

export class Registry {
    private static instance: Registry;
    private _registry: Map<string, Node | Edge>;

    private constructor() {
        this._registry = new Map<string, Node | Edge>();
    }

    static getInstance(): Registry {
        if (typeof this.instance === "undefined") {
            this.instance = new Registry();
        }
        return this.instance;
    }

    private getNextId(): string {
        return "Element_ID_"+(self.crypto.randomUUID()).toString()
    }

    // get
    public get(key: string): Edge | Node | undefined {
        //console.log(this._registry)
        return this._registry.get(key);
    }



    
    // create node
    public createNode(): string {
        const id: string = this.getNextId();
        console.log(id)
        const node: Node = new Node("node " + id, id);
        this._registry.set(id, node);
        return id;
    }

    // create edge
    public createEdge(key1: string, key2: string, ligne: Ligne): string | undefined {
        const id: string = this.getNextId();
        const node1: Node | Edge | undefined = this.get(key1);
        const node2: Node | Edge | undefined = this.get(key2);
        if (typeof node1 !== "undefined" && typeof node2 !== "undefined" && node1 instanceof Node && node2 instanceof Node) {
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
        {key: string,
            name?: string,
            style?: Style, 
            addEntrant?: Edge[], 
            removeEntrant?: Edge[], 
            addSortant?: Edge[], 
            removeSortant?: Edge[]
        }): void {

        let node: Node | Edge | undefined = this.get(key);
        if (typeof node !== "undefined" && node instanceof Node) {
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
        {key: string, 
            name?: string, 
            duree?: Duree, 
            style?: Style,
            isBlocked: boolean
        }): void {

        let edge: Node | Edge | undefined = this.get(key);
        if (typeof edge !== "undefined" && edge instanceof Edge) {
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

    updateStyle(id:string, attribute:string,value:any){1
        const element = this.get(id)
        if(!element){
            return null
        }
        else{
         element.style.d3Attributes[attribute]=value
         return element
        }
    }

    // delete node or edge
    public delete(key: string): string[] {
        const element = this.get(key);
        let removed: string[] = [];
        if (typeof element !== "undefined") {
            if (element instanceof Node) {
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