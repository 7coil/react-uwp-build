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
var react_transition_group_1 = require("react-transition-group");
var FadeInOutChild_1 = require("./FadeInOutChild");
var FadeInOut = /** @class */ (function (_super) {
    __extends(FadeInOut, _super);
    function FadeInOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FadeInOut.prototype.render = function () {
        var _a = this.props, appearAnimate = _a.appearAnimate, childAttributes = _a.childAttributes, children = _a.children, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, maxValue = _a.maxValue, minValue = _a.minValue, mode = _a.mode, speed = _a.speed, style = _a.style, others = __rest(_a, ["appearAnimate", "childAttributes", "children", "enterDelay", "leaveDelay", "maxValue", "minValue", "mode", "speed", "style"]);
        var styles = getStyles(this);
        return (React.createElement(react_transition_group_1.TransitionGroup, __assign({}, others, { style: styles.root }), React.Children.map(children, function (child, index) { return (React.createElement(FadeInOutChild_1.default, __assign({ key: child.key, minValue: minValue, maxValue: maxValue, enterDelay: enterDelay, leaveDelay: leaveDelay, mode: mode, speed: speed, appearAnimate: appearAnimate }, childAttributes), child)); })));
    };
    FadeInOut.defaultProps = {
        appearAnimate: true,
        children: React.createElement("div", null, "FadeInOut"),
        enterDelay: 0,
        leaveDelay: 0,
        maxValue: 1,
        minValue: 0,
        mode: "both",
        speed: 500
    };
    return FadeInOut;
}(React.Component));
exports.default = FadeInOut;
function getStyles(FadeInOut) {
    var style = FadeInOut.props.style;
    return {
        root: __assign({ overflow: "hidden" }, style)
    };
}
//# sourceMappingURL=FadeInOut.js.map