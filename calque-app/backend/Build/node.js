"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var style_1 = require("../TS/style");
var Node = /** @class */ (function () {
    function Node(name, posX, posY) {
        this.style = new style_1.Style("black", "none", 0);
    }
    return Node;
}());
exports.Node = Node;
