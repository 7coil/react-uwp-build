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
exports.ScaleInOut = void 0;
var React = require("react");
var CustomAnimate_1 = require("./CustomAnimate");
var ScaleInOut = /** @class */ (function (_super) {
    __extends(ScaleInOut, _super);
    function ScaleInOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleInOut.prototype.render = function () {
        var _a = this.props, position = _a.position, direction = _a.direction, wrapperStyle = _a.wrapperStyle, others = __rest(_a, ["position", "direction", "wrapperStyle"]);
        return React.createElement(CustomAnimate_1.default, __assign({ leaveStyle: {
                transform: "translate3d(0, " + position + ", 0)",
                opacity: 0
            }, enterStyle: {
                transform: "translate3d(0, 0, 0)",
                opacity: 1
            }, wrapperStyle: __assign({ overflow: "hidden" }, wrapperStyle) }, others));
    };
    ScaleInOut.defaultProps = {
        position: "100%",
        direction: "bottom"
    };
    return ScaleInOut;
}(React.Component));
exports.ScaleInOut = ScaleInOut;
exports.default = ScaleInOut;
//# sourceMappingURL=SlideInOut.js.map