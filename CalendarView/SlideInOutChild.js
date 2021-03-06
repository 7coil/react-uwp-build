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
var SlideInChild = /** @class */ (function (_super) {
    __extends(SlideInChild, _super);
    function SlideInChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentWillAppear = _this.props.appearAnimate ? function (callback) {
            if (_this.props.mode !== "out") {
                _this.initializeAnimation(callback);
            }
            else {
                callback();
            }
            ;
        } : void 0;
        _this.componentDidAppear = _this.props.appearAnimate ? function () {
            if (_this.props.mode !== "out")
                _this.animate();
        } : void 0;
        _this.animate = function (callback) {
            if (callback === void 0) { callback = function () { }; }
            var _a = _this.props, speed = _a.speed, enterDelay = _a.enterDelay;
            var transform = "translate(0, 0)";
            Object.assign(_this.rootElm.style, {
                transform: transform,
                webkitTransform: transform,
                opacity: "1"
            });
            _this.enterTimer = setTimeout(callback, speed + enterDelay);
        };
        _this.initializeAnimation = function (callback, revers) {
            if (callback === void 0) { callback = function () { }; }
            if (revers === void 0) { revers = false; }
            Object.assign(_this.rootElm.parentElement.style, {
                overflow: "hidden"
            });
            var _a = _this.props, direction = _a.direction, speed = _a.speed, leaveDelay = _a.leaveDelay, distance = _a.distance;
            distance = typeof distance === "string" ? distance : distance + "px";
            var x = direction === "left" ? "" + (revers ? "-" : "") + distance :
                direction === "right" ? "" + (revers ? "" : "-") + distance : "0";
            var y = direction === "top" ? "" + (revers ? "" : "-") + distance :
                direction === "bottom" ? "" + (revers ? "-" : "") + distance : "0";
            var transform = "translate(" + x + ", " + y + ")";
            Object.assign(_this.rootElm.style, {
                transform: transform,
                webkitTransform: transform,
                opacity: "0"
            });
            _this.leaveTimer = setTimeout(callback, speed / 2 + leaveDelay);
        };
        return _this;
    }
    SlideInChild.prototype.componentWillEnter = function (callback) {
        if (this.props.mode !== "out") {
            this.initializeAnimation(callback);
        }
        else {
            callback();
        }
    };
    SlideInChild.prototype.componentDidEnter = function () {
        if (this.props.mode !== "out")
            this.animate();
    };
    SlideInChild.prototype.componentWillLeave = function (callback) {
        if (this.props.mode !== "in") {
            this.initializeAnimation(callback, true);
        }
        else {
            this.rootElm.style.display = "none";
            callback();
        }
    };
    SlideInChild.prototype.componentWillUnmount = function () {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    };
    SlideInChild.prototype.render = function () {
        var _this = this;
        var _a = this.props, appearAnimate = _a.appearAnimate, children = _a.children, direction = _a.direction, distance = _a.distance, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, mode = _a.mode, speed = _a.speed, style = _a.style, attributes = __rest(_a, ["appearAnimate", "children", "direction", "distance", "enterDelay", "leaveDelay", "mode", "speed", "style"]);
        return (React.createElement("div", __assign({}, attributes, { ref: function (rootElm) { return _this.rootElm = rootElm; }, style: __assign({ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", transition: "all " + speed + "ms ease-in-out" }, style) }), children));
    };
    SlideInChild.defaultProps = {
        appearAnimate: true,
        direction: "Left",
        distance: "100%",
        enterDelay: 0,
        leaveDelay: 0,
        mode: "Both",
        speed: 500
    };
    return SlideInChild;
}(React.Component));
exports.default = SlideInChild;
//# sourceMappingURL=SlideInOutChild.js.map