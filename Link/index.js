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
var React = require("react");
var PropTypes = require("prop-types");
var PseudoClasses_1 = require("../PseudoClasses");
var emptyFunc = function () { };
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.prototype.render = function () {
        var _a = this.props, style = _a.style, children = _a.children, className = _a.className, attributes = __rest(_a, ["style", "children", "className"]);
        var theme = this.context.theme;
        var inlineStyle = theme.prefixStyle(__assign({ fontSize: 14, color: theme.accent, cursor: "pointer", textDecoration: "none", transition: "all .25s 0s ease-in-out", background: "none", "&:hover": {
                color: theme.baseMedium
            } }, style));
        var styleClasses = theme.prepareStyle({
            className: "link",
            style: inlineStyle,
            extendsClassName: className
        });
        return (React.createElement(PseudoClasses_1.default, __assign({}, styleClasses),
            React.createElement("a", __assign({}, attributes), children)));
    };
    Link.defaultProps = {
        onMouseEnter: emptyFunc,
        onMouseLeave: emptyFunc
    };
    Link.contextTypes = { theme: PropTypes.object };
    return Link;
}(React.Component));
exports.default = Link;
//# sourceMappingURL=index.js.map