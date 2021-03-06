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
exports.AppBarButtonButton = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var RevealEffect_1 = require("../RevealEffect");
var PseudoClasses_1 = require("../PseudoClasses");
var Icon_1 = require("../Icon");
var AppBarButtonButton = /** @class */ (function (_super) {
    __extends(AppBarButtonButton, _super);
    function AppBarButtonButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppBarButtonButton.prototype.render = function () {
        var _a = this.props, icon = _a.icon, iconStyle = _a.iconStyle, hoverStyle = _a.hoverStyle, label = _a.label, className = _a.className, labelPosition = _a.labelPosition, revealConfig = _a.revealConfig, attributes = __rest(_a, ["icon", "iconStyle", "hoverStyle", "label", "className", "labelPosition", "revealConfig"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            styles: inlineStyles,
            className: "app-bar-button"
        });
        var rootProps = __assign(__assign({}, attributes), { style: styles.root.style, className: theme.classNames(className, styles.root.className) });
        return (React.createElement(PseudoClasses_1.default, __assign({}, attributes, { style: styles.root.style, className: theme.classNames(className, styles.root.className) }),
            React.createElement("div", null,
                React.createElement(Icon_1.default, { style: inlineStyles.icon }, icon),
                labelPosition !== "collapsed" && React.createElement("p", __assign({}, styles.label), label),
                React.createElement(RevealEffect_1.default, __assign({}, revealConfig)))));
    };
    AppBarButtonButton.defaultProps = {
        labelPosition: "bottom"
    };
    AppBarButtonButton.contextTypes = { theme: PropTypes.object };
    return AppBarButtonButton;
}(React.Component));
exports.AppBarButtonButton = AppBarButtonButton;
function getStyles(AppBarButtonButton) {
    var context = AppBarButtonButton.context, _a = AppBarButtonButton.props, labelPosition = _a.labelPosition, style = _a.style, iconStyle = _a.iconStyle, hoverStyle = _a.hoverStyle;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    var flexDirection = {
        "bottom": "column",
        "right": "row",
        "left": "row-reverse"
    };
    var isRight = labelPosition === "right";
    return {
        root: prefixStyle(__assign({ position: "relative", fontSize: 14, color: theme.baseMediumHigh, background: "none", display: "flex", flexDirection: flexDirection[labelPosition], alignItems: "center", justifyContent: "flex-start", flex: "0 0 auto", height: "100%", padding: "0 10px", maxWidth: isRight ? 120 : 72, cursor: "default", transition: "all .25s", "&:hover": hoverStyle || {
                background: theme.listAccentLow
            } }, style)),
        label: {
            lineHeight: isRight ? void 0 : 1,
            height: isRight ? void 0 : 28,
            fontSize: 12,
            width: "100%",
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden"
        },
        icon: prefixStyle(__assign({ width: 48, height: 48, lineHeight: "48px", fontSize: 18 }, iconStyle))
    };
}
exports.default = AppBarButtonButton;
//# sourceMappingURL=index.js.map