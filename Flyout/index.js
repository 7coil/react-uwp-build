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
exports.Flyout = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var FlyoutContent_1 = require("../FlyoutContent");
var Flyout = /** @class */ (function (_super) {
    __extends(Flyout, _super);
    function Flyout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Flyout.prototype.render = function () {
        var _a = this.props, style = _a.style, children = _a.children, attributes = __rest(_a, ["style", "children"]);
        var theme = this.context.theme;
        var flyoutContents = [];
        var renderChild = [];
        React.Children.map(children, function (child) {
            if (child.type === FlyoutContent_1.default) {
                flyoutContents.push(child);
            }
            else {
                renderChild.push(child);
            }
        });
        return (React.createElement("div", __assign({}, attributes, { style: theme.prefixStyle(__assign(__assign({ display: "inline-block" }, style), { position: "relative" })) }),
            flyoutContents,
            renderChild));
    };
    Flyout.contextTypes = { theme: PropTypes.object };
    return Flyout;
}(React.Component));
exports.Flyout = Flyout;
exports.default = Flyout;
//# sourceMappingURL=index.js.map