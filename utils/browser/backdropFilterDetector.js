"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportBackdropFilter = void 0;
function isSupportBackdropFilter() {
    var isSupported = false;
    var propertyName = "backdropFilter";
    var propertyValue = "blur(10px)";
    if (global["CSS"] && CSS.supports) {
        return CSS.supports("backdrop-filter", propertyValue);
    }
    else {
        var elm = document.createElement("div");
        var style = elm.style;
        isSupported = style[propertyName] !== void 0;
        if (isSupported) {
            style[propertyName] = propertyValue;
            isSupported = style.cssText.length !== 0;
        }
        elm = null;
        return isSupported;
    }
}
exports.isSupportBackdropFilter = isSupportBackdropFilter;
//# sourceMappingURL=backdropFilterDetector.js.map