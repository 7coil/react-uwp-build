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
exports.IconButton = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var RevealEffect_1 = require("../RevealEffect");
var Icon_1 = require("../Icon");
var IconButton = /** @class */ (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconButton.prototype.render = function () {
        var _a = this.props, style = _a.style, hoverStyle = _a.hoverStyle, activeStyle = _a.activeStyle, children = _a.children, size = _a.size, disabled = _a.disabled, revealConfig = _a.revealConfig, attributes = __rest(_a, ["style", "hoverStyle", "activeStyle", "children", "size", "disabled", "revealConfig"]);
        var theme = this.context.theme;
        return (React.createElement(Icon_1.default, __assign({}, attributes, { style: __assign({ position: "relative", display: "inline-block", fontFamily: theme.fonts.segoeMDL2Assets, verticalAlign: "middle", textAlign: "center", userSelect: "none", background: disabled ? theme.baseLow : "none", border: "none", outline: "none", fontSize: size / 2, width: size, height: size, cursor: "pointer", color: disabled ? theme.baseMedium : theme.baseHigh, padding: 0, flexShrink: 0, lineHeight: size + "px", transition: "background .25s ease-in-out" }, style), hoverStyle: disabled ? void 0 : hoverStyle || {
                background: theme.listLow
            }, activeStyle: disabled ? void 0 : activeStyle || {
                background: theme.baseLow
            } }),
            children,
            React.createElement(RevealEffect_1.default, __assign({}, revealConfig))));
    };
    IconButton.defaultProps = {
        size: 48,
        revealConfig: {
            effectEnable: "disabled"
        }
    };
    IconButton.contextTypes = { theme: PropTypes.object };
    return IconButton;
}(React.Component));
exports.IconButton = IconButton;
exports.default = IconButton;
//# sourceMappingURL=index.js.map