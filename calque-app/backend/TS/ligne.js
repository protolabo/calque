"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ligne = void 0;
var style_1 = require("./style");
var Ligne = /** @class */ (function () {
    function Ligne(name) {
        this.defaultDuree = undefined;
        this.style = new style_1.Style("none", "black", 5);
    }
    Ligne.prototype.setDefaultDuree = function (duree) {
        this.defaultDuree = duree;
    };
    return Ligne;
}());
exports.Ligne = Ligne;
