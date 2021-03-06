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
exports.icons = exports.Icon = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var PseudoClasses_1 = require("../PseudoClasses");
var icons_1 = require("./icons");
var icons = icons_1.default;
exports.icons = icons;
var emptyFunc = function () { };
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hovered: false
        };
        _this.handleMouseEnter = function (e) {
            _this.props.onMouseEnter(e);
            _this.setState({
                hovered: true
            });
        };
        _this.handleMouseLeave = function (e) {
            _this.props.onMouseLeave(e);
            _this.setState({
                hovered: false
            });
        };
        return _this;
    }
    Icon.prototype.render = function () {
        var _a = this.props, size = _a.size, className = _a.className, style = _a.style, hoverStyle = _a.hoverStyle, activeStyle = _a.activeStyle, children = _a.children, useSVGElement = _a.useSVGElement, attributes = __rest(_a, ["size", "className", "style", "hoverStyle", "activeStyle", "children", "useSVGElement"]);
        var theme = this.context.theme;
        var hovered = this.state.hovered;
        var inlineStyle = theme.prefixStyle(__assign(__assign({ display: "inline-block", textAlign: "center", verticalAlign: "middle", fontFamily: theme.fonts.segoeMDL2Assets, transition: "all .25s", border: "none", outline: "none", userSelect: "none", width: size, height: size, lineHeight: size ? size + "px" : "inherit", fontSize: size || "inherit", color: "inherit" }, style), { "&:hover": hovered ? hoverStyle : void 0, "&:active": activeStyle }));
        var styleClasses = theme.prepareStyle({
            className: "icon",
            style: inlineStyle,
            extendsClassName: className
        });
        if (children) {
            children = React.Children.map(children, function (child) {
                var newIcon = icons[child];
                return newIcon || child;
            });
        }
        return (React.createElement(PseudoClasses_1.default, __assign({}, attributes, { onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, styleClasses), useSVGElement ? (React.createElement("text", null, children)) : (React.createElement("span", null, children))));
    };
    Icon.defaultProps = {
        useSVGElement: false,
        onMouseEnter: emptyFunc,
        onMouseLeave: emptyFunc
    };
    Icon.contextTypes = { theme: PropTypes.object };
    return Icon;
}(React.Component));
exports.Icon = Icon;
exports.default = Icon;
//# sourceMappingURL=index.js.map