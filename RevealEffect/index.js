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
exports.RevealEffect = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var RevealEffect = /** @class */ (function (_super) {
    __extends(RevealEffect, _super);
    function RevealEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currPosition = {
            clientX: 0,
            clientY: 0
        };
        return _this;
    }
    RevealEffect.prototype.componentDidMount = function () {
        this.updateDOMNode();
    };
    RevealEffect.prototype.componentDidUpdate = function () {
        this.updateDOMNode();
    };
    RevealEffect.prototype.componentWillUnmount = function () {
        this.removeDOMNode();
    };
    RevealEffect.prototype.updateDOMNode = function () {
        var theme = this.context.theme;
        var _a = this.props, effectEnable = _a.effectEnable, hoverSize = _a.hoverSize, hoverColor = _a.hoverColor, borderWidth = _a.borderWidth, borderColor = _a.borderColor, effectRange = _a.effectRange, observerResize = _a.observerResize, observerTransition = _a.observerTransition;
        var currRevealConfig = theme.getRevealConfig(theme.revealConfig, {
            borderWidth: borderWidth,
            hoverSize: hoverSize,
            effectEnable: effectEnable,
            hoverColor: hoverColor,
            borderColor: borderColor,
            effectRange: effectRange,
            observerResize: observerResize,
            observerTransition: observerTransition
        });
        theme.addBorderCanvas(this.borderCanvasEl, currRevealConfig);
    };
    RevealEffect.prototype.removeDOMNode = function () {
        this.context.theme.removeBorderCanvas(this.borderCanvasEl);
    };
    RevealEffect.prototype.render = function () {
        var _this = this;
        var _a = this.props, borderWidth = _a.borderWidth, hoverSize = _a.hoverSize, effectEnable = _a.effectEnable, hoverColor = _a.hoverColor, borderColor = _a.borderColor, effectRange = _a.effectRange, observerResize = _a.observerResize, observerTransition = _a.observerTransition, attributes = __rest(_a, ["borderWidth", "hoverSize", "effectEnable", "hoverColor", "borderColor", "effectRange", "observerResize", "observerTransition"]);
        var theme = this.context.theme;
        var styles = getStyles(this);
        var classes = theme.prepareStyles({
            styles: styles,
            className: "reveal-effect"
        });
        return (React.createElement(React.Fragment, null,
            React.createElement("canvas", __assign({ width: 0, height: 0, ref: function (hoverCanvas) { return _this.hoverCanvasEl = hoverCanvas; } }, attributes, classes.root)),
            React.createElement("canvas", __assign({ width: 0, height: 0, ref: function (borderCanvas) { return _this.borderCanvasEl = borderCanvas; } }, attributes, classes.root))));
    };
    RevealEffect.contextTypes = { theme: PropTypes.object };
    return RevealEffect;
}(React.Component));
exports.RevealEffect = RevealEffect;
function getStyles(RevealEffect) {
    var theme = RevealEffect.context.theme, style = RevealEffect.props.style;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ background: "none", position: "absolute", pointerEvents: "none", flex: "0 0 auto", display: "none", left: 0, top: 0, width: 0, height: 0 }, style))
    };
}
exports.default = RevealEffect;
//# sourceMappingURL=index.js.map