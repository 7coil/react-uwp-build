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
var ScaleInOutChild = /** @class */ (function (_super) {
    __extends(ScaleInOutChild, _super);
    function ScaleInOutChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentWillAppear = _this.props.appearAnimate ? function (callback) {
            if (_this.props.mode !== "out") {
                _this.initializeAnimation(callback);
            }
            else {
                callback();
            }
        } : void 0;
        _this.componentDidAppear = _this.props.appearAnimate ? function () {
            if (_this.props.mode !== "out") {
                _this.enterTimer = setTimeout(function () {
                    _this.animate();
                }, _this.props.enterDelay);
            }
        } : void 0;
        _this.animate = function (callback) {
            if (callback === void 0) { callback = function () { }; }
            var _a = _this.props, speed = _a.speed, maxScale = _a.maxScale, enterDelay = _a.enterDelay;
            var style = _this.rootElm.style;
            var transform = "scale(" + maxScale + ")";
            Object.assign(style, {
                transform: transform,
                webkitTransform: transform,
                opacity: "1"
            });
            _this.enterTimer = setTimeout(callback, speed + enterDelay);
        };
        _this.initializeAnimation = function (callback, revers) {
            if (callback === void 0) { callback = function () { }; }
            if (revers === void 0) { revers = false; }
            var _a = _this.props, minScale = _a.minScale, speed = _a.speed, leaveDelay = _a.leaveDelay;
            var transform = "scale(" + minScale + ")";
            Object.assign(_this.rootElm.style, {
                transform: transform,
                webkitTransform: transform,
                opacity: "0"
            });
            _this.leaveTimer = setTimeout(callback, speed + leaveDelay);
        };
        return _this;
    }
    ScaleInOutChild.prototype.componentWillEnter = function (callback) {
        var _this = this;
        if (this.props.mode !== "out") {
            var display_1 = this.rootElm.style.display;
            this.rootElm.style.display = "none";
            this.enterTimer = setTimeout(function () {
                _this.rootElm.style.display = display_1;
                _this.initializeAnimation(callback);
            }, this.props.speed + this.props.enterDelay);
        }
        else {
            callback();
        }
    };
    ScaleInOutChild.prototype.componentDidEnter = function () {
        if (this.props.mode !== "out")
            this.animate();
    };
    ScaleInOutChild.prototype.componentWillLeave = function (callback) {
        if (this.props.mode !== "in") {
            this.initializeAnimation(callback, true);
        }
        else {
            callback();
        }
    };
    ScaleInOutChild.prototype.componentWillUnmount = function () {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    };
    ScaleInOutChild.prototype.render = function () {
        var _this = this;
        var _a = this.props, appearAnimate = _a.appearAnimate, children = _a.children, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, maxScale = _a.maxScale, minScale = _a.minScale, speed = _a.speed, style = _a.style, mode = _a.mode, attributes = __rest(_a, ["appearAnimate", "children", "enterDelay", "leaveDelay", "maxScale", "minScale", "speed", "style", "mode"]);
        return (React.createElement("div", __assign({}, attributes, { ref: function (rootElm) { return _this.rootElm = rootElm; }, style: __assign({ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", transition: "all " + speed + "ms ease-in-out" }, style) }), children));
    };
    ScaleInOutChild.defaultProps = {
        appearAnimate: true,
        enterDelay: 0,
        leaveDelay: 0,
        maxScale: 1,
        minScale: 0,
        mode: "Both",
        speed: 250
    };
    return ScaleInOutChild;
}(React.Component));
exports.default = ScaleInOutChild;
//# sourceMappingURL=ScaleInOutChild.js.map