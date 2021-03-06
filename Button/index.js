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
exports.Button = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var PseudoClasses_1 = require("../PseudoClasses");
var Icon_1 = require("../Icon");
var Tooltip_1 = require("../Tooltip");
var RevealEffect_1 = require("../RevealEffect");
var labelStyle = {
    verticalAlign: "middle"
};
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var _a = this.props, borderSize = _a.borderWidth, style = _a.style, className = _a.className, hoverStyle = _a.hoverStyle, children = _a.children, icon = _a.icon, iconStyle = _a.iconStyle, iconPosition = _a.iconPosition, disabled = _a.disabled, tooltip = _a.tooltip, background = _a.background, activeStyle = _a.activeStyle, revealConfig = _a.revealConfig, attributes = __rest(_a, ["borderWidth", "style", "className", "hoverStyle", "children", "icon", "iconStyle", "iconPosition", "disabled", "tooltip", "background", "activeStyle", "revealConfig"]);
        var theme = this.context.theme;
        var currBorderWidth = borderSize === void 0 ? theme.borderWidth : borderSize;
        var buttonStyles = theme.prepareStyle({
            className: "button-root",
            style: __assign(__assign({ position: "relative", display: "inline-block", verticalAlign: "middle", cursor: "pointer", color: theme.baseHigh, outline: "none", padding: "4px 16px", transition: "all .25s", border: currBorderWidth + "px solid transparent", background: background || theme.baseLow }, theme.prefixStyle(style)), { "&:hover": disabled ? void 0 : {
                    border: currBorderWidth + "px solid " + theme.baseMediumLow
                }, "&:active": disabled ? void 0 : {
                    background: theme.baseMediumLow
                }, "&:disabled": {
                    background: theme.baseMedium,
                    cursor: "not-allowed",
                    color: theme.baseMedium
                } }),
            extendsClassName: className
        });
        var iconStyles = theme.prepareStyle({
            className: "button-icon",
            style: __assign({ padding: "0 4px", display: "inline-block" }, theme.prefixStyle(iconStyle))
        });
        var normalRender = (React.createElement(PseudoClasses_1.default, __assign({}, attributes, { disabled: disabled }, buttonStyles), (icon ? (iconPosition === "right" ? (React.createElement("button", null,
            React.createElement("span", { style: labelStyle }, children),
            React.createElement(Icon_1.default, __assign({}, iconStyles), icon),
            React.createElement(RevealEffect_1.default, null))) : (React.createElement("button", null,
            React.createElement(Icon_1.default, __assign({}, iconStyles), icon),
            React.createElement("span", { style: labelStyle }, children),
            React.createElement(RevealEffect_1.default, null)))) : (React.createElement("button", null,
            children,
            React.createElement(RevealEffect_1.default, __assign({}, revealConfig)))))));
        return tooltip ? (React.createElement(Tooltip_1.default, { contentNode: tooltip }, normalRender)) : normalRender;
    };
    Button.defaultProps = {
        iconPosition: "left"
    };
    Button.contextTypes = { theme: PropTypes.object };
    return Button;
}(React.Component));
exports.Button = Button;
exports.default = Button;
//# sourceMappingURL=index.js.map