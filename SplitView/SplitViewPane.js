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
exports.SplitViewPane = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var SplitViewPane = /** @class */ (function (_super) {
    __extends(SplitViewPane, _super);
    function SplitViewPane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplitViewPane.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, style = _a.style, attributes = __rest(_a, ["children", "style"]);
        var theme = this.context.theme;
        return (React.createElement("div", __assign({}, attributes, { style: theme.prefixStyle(style), ref: function (rootElm) { return _this.rootElm = rootElm; } }), children));
    };
    SplitViewPane.contextTypes = { theme: PropTypes.object };
    return SplitViewPane;
}(React.Component));
exports.SplitViewPane = SplitViewPane;
exports.default = SplitViewPane;
//# sourceMappingURL=SplitViewPane.js.map