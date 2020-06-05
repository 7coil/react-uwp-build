"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDot = exports.getStriped = exports.getProtrudingSquares = exports.getAttributesString = exports.createFeDropShadow = exports.createTagString = exports.paramCase = void 0;
function paramCase(str) {
    return str.replace(/[A-Z]/g, function ($1) { return "-" + $1.toLowerCase(); });
}
exports.paramCase = paramCase;
function createTagString(tagConfig) {
    var e_1, _a;
    var tag = tagConfig.tag, attributes = tagConfig.attributes, children = tagConfig.children;
    var hadChild = Boolean(children);
    var elStr = "<" + tag + (hadChild ? ">" : "");
    if (attributes) {
        elStr += getAttributesString(attributes);
    }
    if (hadChild) {
        try {
            for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                var child = children_1_1.value;
                elStr += createTagString(child);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        elStr += "</" + tag + ">";
    }
    else {
        elStr += " />";
    }
    return elStr;
}
exports.createTagString = createTagString;
// @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDropShadow
function createFeDropShadow(attributes) {
    var elStr = createTagString({ tag: "feDropShadow", attributes: attributes });
    return elStr;
}
exports.createFeDropShadow = createFeDropShadow;
function getAttributesString(attribute) {
    var attributesStr = "";
    if (!attribute)
        return attributesStr;
    for (var key in attribute) {
        var value = attribute[key];
        if (value !== void 0) {
            var paramCaseKey = paramCase(key);
            attributesStr += " " + paramCaseKey + "=\"" + value + "\"";
        }
    }
    return attributesStr;
}
exports.getAttributesString = getAttributesString;
function getProtrudingSquares(config) {
    var dataImageType = "data:image/svg+xml;charset=utf-8,";
    var svgText = "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'>\n<defs>\n    <linearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'>\n        <stop offset='0' stop-color='" + config.shadowColor + "' stop-opacity='0'/>\n        <stop offset='1' stop-color='" + config.shadowColor + "' stop-opacity='1'/>\n    </linearGradient>\n    <linearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'>\n        <stop offset='0' stop-color='" + config.shadowColor + "' stop-opacity='0'/>\n        <stop offset='1' stop-color='" + config.shadowColor + "' stop-opacity='1'/>\n    </linearGradient>\n</defs>\n<g fill='" + config.mainColor + "' fill-opacity='" + config.opacity + "'>\n    <rect x='100' width='100' height='100'/>\n    <rect y='100' width='100' height='100'/>\n</g>\n<g fill-opacity='0.5'>\n    <polygon fill='url(#a)' points='100 30 0 0 200 0'/>\n    <polygon fill='url(#b)' points='100 100 0 130 0 100 200 100 200 130'/>\n</g>\n</svg>";
    svgText = encodeURIComponent(svgText);
    var backgroundStyle = " repeat";
    return dataImageType + svgText + backgroundStyle;
}
exports.getProtrudingSquares = getProtrudingSquares;
function getStriped(config) {
    var _a = config || {}, size = _a.size, primaryColor = _a.primaryColor, secondaryColor = _a.secondaryColor, direction = _a.direction;
    size = size || 4;
    primaryColor = primaryColor || "#000";
    secondaryColor = secondaryColor || "transparent";
    direction = direction || "ltr";
    var isLtr = direction === "ltr";
    return "linear-gradient(" + (isLtr ? 45 : 135) + "deg, " + primaryColor + " 25%, " + secondaryColor + " 0px, " + secondaryColor + " 50%, " + primaryColor + " 0px, " + primaryColor + " 75%, " + secondaryColor + " 0px) 0% 0% / " + size + "px " + size + "px " + primaryColor;
}
exports.getStriped = getStriped;
function getDot(color) {
    if (color === void 0) { color = "#fff"; }
    var dataImageType = "data:image/svg+xml;charset=utf-8,";
    var svgText = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' style='enable-background:new 0 0 16 16' xml:space='preserve'><rect width='16' fill='none' height='16'/><rect x='0' y='0' fill='" + color + "' width='1' height='1'/></svg>";
    svgText = encodeURIComponent(svgText);
    var backgroundStyle = " repeat";
    return dataImageType + svgText + backgroundStyle;
}
exports.getDot = getDot;
// console.log(createFeDropShadow({ dx: 22, dy: 22, floodColor: "#fff", floodOpacity: 3 }));
//# sourceMappingURL=backgrounds.js.map