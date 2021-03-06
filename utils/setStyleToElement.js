"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isUnitlessNumber = [
    "animationIterationCount",
    "borderImageOutset",
    "borderImageSlice",
    "borderImageWidth",
    "boxFlex",
    "boxFlexGroup",
    "boxOrdinalGroup",
    "columnCount",
    "flex",
    "flexGrow",
    "flexPositive",
    "flexShrink",
    "flexNegative",
    "flexOrder",
    "gridRow",
    "gridColumn",
    "fontWeight",
    "lineClamp",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "tabSize",
    "widows",
    "zIndex",
    "zoom",
    // SVG-related properties
    "fillOpacity",
    "floodOpacity",
    "stopOpacity",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth"
];
function setStyleToElement(elm, style, setToCSSText) {
    if (setToCSSText === void 0) { setToCSSText = false; }
    var cssText = "";
    if (setToCSSText) {
        for (var property in style) {
            var propertyNow = [].map.call(property, function (str) { return str === str.toUpperCase() ? "-" + str.toLowerCase() : str; }).join("");
            var value = style[property];
            if (typeof value === "number" && !isUnitlessNumber.includes(property))
                value = value + "px";
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value = value[value.length - 1];
                }
                else {
                    throw Error(propertyNow + ": " + value + " is Wrong!");
                }
            }
            cssText += propertyNow + ": " + value + ";";
        }
        elm.style.cssText = cssText;
    }
    else {
        for (var property in style) {
            var value = style[property];
            if (typeof value === "number" && !isUnitlessNumber.includes(property)) {
                style[property] = value + "px";
            }
        }
        Object.assign(elm.style, style);
    }
}
exports.default = setStyleToElement;
//# sourceMappingURL=setStyleToElement.js.map