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
exports.PseudoClasses = void 0;
var React = require("react");
var react_dom_1 = require("react-dom");
var PropTypes = require("prop-types");
var ElementState_1 = require("./ElementState");
var spreadObject_1 = require("./utils/spreadObject");
var pseudoClassesNames = ["&:hover", "&:active", "&:visited", "&:focus", "&:disabled"];
var PseudoClasses = /** @class */ (function (_super) {
    __extends(PseudoClasses, _super);
    function PseudoClasses() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElm = null;
        return _this;
    }
    PseudoClasses.prototype.componentDidMount = function () {
        var _a = this, theme = _a.context.theme, _b = _a.props, style = _b.style, children = _b.children;
        if (theme.useInlineStyle || style) {
            this.rootElm = react_dom_1.findDOMNode(this);
        }
    };
    PseudoClasses.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, children = _a.children, attributes = __rest(_a, ["style", "children"]);
        if (this.context.theme.useInlineStyle && style) {
            var _b = spreadObject_1.default(style, pseudoClassesNames), primaryObject = _b.primaryObject, secondaryObject = _b.secondaryObject;
            return (React.createElement(ElementState_1.default, __assign({}, attributes, { ref: function (elementState) { return _this.rootElm = elementState ? elementState.rootElm : null; }, style: primaryObject }, {
                hoverStyle: secondaryObject["&:hover"],
                activeStyle: secondaryObject["&:active"],
                visitedStyle: secondaryObject["&:visited"],
                focusStyle: secondaryObject["&:focus"],
                disabledStyle: secondaryObject["&:disabled"]
            }), children));
        }
        else {
            return React.cloneElement(children, __assign(__assign(__assign({}, children.props), attributes), { style: style }));
        }
    };
    PseudoClasses.contextTypes = { theme: PropTypes.object };
    return PseudoClasses;
}(React.Component));
exports.PseudoClasses = PseudoClasses;
exports.default = PseudoClasses;
//# sourceMappingURL=PseudoClasses.js.map