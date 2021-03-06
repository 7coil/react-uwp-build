"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRing = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var vendors_1 = require("../utils/browser/vendors");
var vendorPrefixes = vendors_1.default.map(function (str) { return str ? "-" + str + "-" : str; });
var ProgressRing = /** @class */ (function (_super) {
    __extends(ProgressRing, _super);
    function ProgressRing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getOnlyClassName = function () {
            var _a = _this.props, dotsNumber = _a.dotsNumber, speed = _a.speed;
            return "react-uwp-progress-ring_" + dotsNumber + "_" + speed;
        };
        _this.getCSSText = function (className) {
            var _a = _this.props, dotsNumber = _a.dotsNumber, speed = _a.speed;
            return ("." + className + " {\n}\n" + Array(dotsNumber).fill(0).map(function (name, index) { return (["." + className + "-item-" + index + " {",
                vendorPrefixes.map(function (str) { return ("    " + str + "animation: CircleLoopFade " + speed + "ms " + index * speed / 40 + "ms linear infinite normal forwards;"); }).join("\n"), "  }"].join("")); }).join("") + "\n\n" + vendorPrefixes.map(function (str) { return "@" + str + "keyframes CircleLoopFade {\n  0% {\n    transform: rotateZ(0deg);\n    opacity: 1;\n  }\n  12.5% {\n    transform: rotateZ(180deg);\n    opacity: 0.8;\n  }\n  25% {\n    transform: rotateZ(270deg);\n    opacity: 0.8;\n  }\n  37.5% {\n    transform: rotateZ(300deg);\n    opacity: 0.8;\n  }\n  50% {\n    transform: rotateZ(360deg);\n    opacity: 1;\n  }\n  62.5% {\n    transform: rotateZ(540deg);\n    opacity: 0;\n  }\n  75% {\n    transform: rotateZ(630deg);\n    opacity: 0;\n  }\n  87.5% {\n    transform: rotateZ(660deg);\n    opacity: 0;\n  }\n  100% {\n    transform: rotateZ(720deg);\n    opacity: 1;\n  }\n}"; }) + ".join(\"\")");
        };
        return _this;
    }
    ProgressRing.prototype.render = function () {
        var _a = this.props, dotsNumber = _a.dotsNumber, size = _a.size, speed = _a.speed, dotsStyle = _a.dotsStyle, style = _a.style, className = _a.className, attributes = __rest(_a, ["dotsNumber", "size", "speed", "dotsStyle", "style", "className"]);
        var theme = this.context.theme;
        var onlyClassName = this.getOnlyClassName();
        theme.styleManager.addCSSText(this.getCSSText(onlyClassName));
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "progress-ring",
            styles: inlineStyles
        });
        return (React.createElement("div", __assign({}, attributes, { className: theme.classNames(styles.root.className, className), style: styles.root.style }),
            React.createElement("div", null, Array(dotsNumber).fill(0).map(function (numb, index) { return (React.createElement("div", { key: "" + index, className: theme.classNames(onlyClassName + "-item-" + index, styles.item.className), style: styles.item.style })); }))));
    };
    ProgressRing.defaultProps = {
        dotsNumber: 6,
        speed: 5000,
        size: 100
    };
    ProgressRing.contextTypes = { theme: PropTypes.object };
    return ProgressRing;
}(React.Component));
exports.ProgressRing = ProgressRing;
function getStyles(progressRing) {
    var _a = progressRing.props, style = _a.style, dotsStyle = _a.dotsStyle, size = _a.size, theme = progressRing.context.theme;
    var dotsSize = size / 12;
    return {
        root: theme.prefixStyle(__assign(__assign({ display: "inline-block" }, style), { width: size, height: size, position: "relative" })),
        item: theme.prefixStyle(__assign(__assign({ background: theme.accent }, dotsStyle), { position: "absolute", top: 0, left: size / 2, width: dotsSize, height: dotsSize, opacity: 0, transformOrigin: "0px " + size / 2 + "px", borderRadius: dotsSize }))
    };
}
exports.default = ProgressRing;
//# sourceMappingURL=index.js.map