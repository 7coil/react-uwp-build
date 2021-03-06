"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spreadObject = void 0;
function spreadObject(obj, keys) {
    var primaryObject = {};
    var secondaryObject = {};
    var canCheckObjectSymbol = obj !== null && typeof Object.getOwnPropertySymbols === "function";
    var symbols = canCheckObjectSymbol ? Object.getOwnPropertySymbols(obj) : null;
    var symbolsSize = canCheckObjectSymbol ? symbols.length : 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property) && keys.indexOf(property) < 0) {
            primaryObject[property] = obj[property];
        }
        else {
            secondaryObject[property] = obj[property];
        }
        if (canCheckObjectSymbol) {
            for (var i = 0; i < symbolsSize; i++) {
                if (keys.indexOf(symbols[i]) < 0) {
                    primaryObject[property[i]] = obj[property[i]];
                }
                else {
                    secondaryObject[property[i]] = obj[property[i]];
                }
            }
        }
    }
    return { primaryObject: primaryObject, secondaryObject: secondaryObject };
}
exports.spreadObject = spreadObject;
exports.default = spreadObject;
//# sourceMappingURL=spreadObject.js.map