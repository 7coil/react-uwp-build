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
var SlideInOutChild_1 = require("./SlideInOutChild");
var SlideInOut = /** @class */ (function (_super) {
    __extends(SlideInOut, _super);
    function SlideInOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideInOut.prototype.render = function () {
        var _a = this.props, appearAnimate = _a.appearAnimate, childAttributes = _a.childAttributes, children = _a.children, direction = _a.direction, distance = _a.distance, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, mode = _a.mode, speed = _a.speed, style = _a.style, others = __rest(_a, ["appearAnimate", "childAttributes", "children", "direction", "distance", "enterDelay", "leaveDelay", "mode", "speed", "style"]);
        var styles = getStyles(this);
        return (React.createElement(react_transition_group_1.TransitionGroup, __assign({}, others, { style: styles.root, component: "div" }), React.Children.map(children, function (child, index) { return (React.createElement(SlideInOutChild_1.default, __assign({ key: child.key, direction: direction, enterDelay: enterDelay, leaveDelay: leaveDelay, mode: mode, speed: speed, distance: distance, appearAnimate: appearAnimate }, childAttributes), child)); })));
    };
    SlideInOut.defaultProps = {
        speed: 500,
        enterDelay: 0,
        leaveDelay: 0,
        direction: "left",
        mode: "both",
        distance: "100%",
        children: React.createElement("div", null, "SlideInOut"),
        appearAnimate: true
    };
    return SlideInOut;
}(React.Component));
exports.default = SlideInOut;
function getStyles(SlideInOut) {
    var _a = SlideInOut.props, style = _a.style, speed = _a.speed;
    return {
        root: __assign({ position: "relative", width: "100%", height: "100%", transition: "all " + speed + "ms ease-in-out" }, style)
    };
}
//# sourceMappingURL=SlideInOut.js.map