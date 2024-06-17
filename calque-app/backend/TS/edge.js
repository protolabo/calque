"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edge = void 0;
var style_js_1 = require("./style.js");
var Edge = /** @class */ (function () {
    function Edge(name, node1, node2, ligne, duree) {
        if (duree === void 0) { duree = undefined; }
        this.style = new style_js_1.Style("none", "black", 5);
        this.isBlocked = false;
    }
    Edge.prototype.swapBlockState = function () {
        if (this.isBlocked) {
            this.isBlocked = false;
        }
        else {
            this.isBlocked = true;
        }
    };
    return Edge;
}());
exports.Edge = Edge;
