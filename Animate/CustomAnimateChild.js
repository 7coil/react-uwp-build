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
var react_dom_1 = require("react-dom");
var CustomAnimateChild = /** @class */ (function (_super) {
    __extends(CustomAnimateChild, _super);
    function CustomAnimateChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentWillAppear = _this.props.appearAnimate ? function (callback) {
            if (_this.props.mode !== "out") {
                _this.setLeaveStyle(callback);
            }
            else {
                callback();
            }
        } : void 0;
        _this.componentDidAppear = _this.props.appearAnimate ? function () {
            if (_this.props.mode !== "out") {
                _this.enterTimer = setTimeout(function () {
                    _this.setEnterStyle();
                }, _this.props.enterDelay);
            }
        } : void 0;
        _this.setEnterStyle = function (callback) {
            if (callback === void 0) { callback = function () { }; }
            var _a = _this.props, speed = _a.speed, enterDelay = _a.enterDelay, enterStyle = _a.enterStyle;
            var style = _this.getRootElmOrComponentStyle(_this.rootElm);
            Object.assign(style, _this.context.theme.prefixStyle(enterStyle));
            _this.enterTimer = setTimeout(callback, speed + enterDelay);
        };
        _this.setLeaveStyle = function (callback, revers) {
            if (callback === void 0) { callback = function () { }; }
            if (revers === void 0) { revers = false; }
            var _a = _this.props, speed = _a.speed, leaveDelay = _a.leaveDelay;
            var style = _this.getRootElmOrComponentStyle(_this.rootElm);
            Object.assign(style, _this.context.theme.prefixStyle(_this.props.leaveStyle));
            callback();
        };
        _this.getRootElmOrComponentStyle = function (rootElm) {
            var style = rootElm.style;
            if (style) {
                return style;
            }
            else {
                rootElm = react_dom_1.findDOMNode(rootElm);
                style = rootElm.style;
                if (style) {
                    return style;
                }
                else if (rootElm) {
                    return _this.getRootElmOrComponentStyle(rootElm);
                }
                else {
                    return {};
                }
            }
        };
        return _this;
    }
    CustomAnimateChild.prototype.componentWillEnter = function (callback) {
        var _this = this;
        var _a = this.props, mode = _a.mode, speed = _a.speed, enterDelay = _a.enterDelay;
        clearTimeout(this.leaveTimer);
        var style = this.rootElm.style;
        var display = style.display;
        style.display = "none";
        this.displayStyleTimer = setTimeout(function () {
            style.display = display;
        }, (mode === "in" ? 0 : speed) + enterDelay);
        if (mode === "out") {
            this.enterTimer = setTimeout(function () {
                _this.setEnterStyle();
                callback();
            }, speed);
            return;
        }
        this.setLeaveStyle();
        this.enterTimer = setTimeout(function () {
            style.display = display;
            _this.setEnterStyle();
            callback();
        }, mode === "in" ? 40 + enterDelay : speed + 40 + enterDelay);
    };
    CustomAnimateChild.prototype.componentWillLeave = function (callback) {
        var _this = this;
        if (this.props.mode !== "in") {
            this.setLeaveStyle();
            this.leaveTimer = setTimeout(function () {
                _this.rootElm.style.display = "none";
                callback();
            }, this.props.speed + this.props.leaveDelay);
        }
        else {
            this.rootElm.style.display = "none";
            callback();
        }
    };
    CustomAnimateChild.prototype.componentWillUnmount = function () {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
        clearTimeout(this.displayStyleTimer);
    };
    CustomAnimateChild.prototype.render = function () {
        var _this = this;
        var _a = this.props, appearAnimate = _a.appearAnimate, children = _a.children, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, mode = _a.mode, speed = _a.speed, style = _a.style, leaveStyle = _a.leaveStyle, enterStyle = _a.enterStyle, transitionTimingFunction = _a.transitionTimingFunction, attributes = __rest(_a, ["appearAnimate", "children", "enterDelay", "leaveDelay", "mode", "speed", "style", "leaveStyle", "enterStyle", "transitionTimingFunction"]);
        var theme = this.context.theme;
        var currStyle = theme.prefixStyle(__assign(__assign(__assign({ transition: "all " + speed + "ms" + (transitionTimingFunction ? " " + transitionTimingFunction : "") }, style), children.props.style), (appearAnimate ? leaveStyle : Object.assign({}, leaveStyle, enterStyle))));
        return typeof children !== "object" ? (React.createElement("span", __assign({}, attributes, { ref: function (rootElm) { return _this.rootElm = rootElm; }, style: currStyle }), children)) : React.cloneElement(children, {
            style: currStyle,
            ref: function (rootElm) { return _this.rootElm = rootElm; }
        });
    };
    CustomAnimateChild.contextTypes = { theme: PropTypes.object };
    return CustomAnimateChild;
}(React.Component));
exports.default = CustomAnimateChild;
//# sourceMappingURL=CustomAnimateChild.js.map