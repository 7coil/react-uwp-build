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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slideRightInProps = exports.slideLeftInProps = exports.slideBottomInProps = exports.slideTopInProps = exports.scaleInProps = exports.fadeInProps = exports.CustomAnimate = void 0;
var React = require("react");
var react_transition_group_1 = require("react-transition-group");
var PropTypes = require("prop-types");
var CustomAnimateChild_1 = require("./CustomAnimateChild");
var baseStyle = {
    display: "inline-block",
    verticalAlign: "middle"
};
function FirstChild(props) {
    var childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}
var CustomAnimate = /** @class */ (function (_super) {
    __extends(CustomAnimate, _super);
    function CustomAnimate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customAnimateChildArray = [];
        _this.setLeaveStyle = function () {
            var e_1, _a;
            try {
                for (var _b = __values(_this.customAnimateChildArray), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var customAnimateChild = _c.value;
                    customAnimateChild.setLeaveStyle();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        _this.setEnterStyle = function () {
            var e_2, _a;
            try {
                for (var _b = __values(_this.customAnimateChildArray), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var customAnimateChild = _c.value;
                    customAnimateChild.setEnterStyle();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return _this;
    }
    CustomAnimate.prototype.render = function () {
        var _this = this;
        var _a = this.props, appearAnimate = _a.appearAnimate, children = _a.children, enterDelay = _a.enterDelay, leaveDelay = _a.leaveDelay, mode = _a.mode, speed = _a.speed, style = _a.style, leaveStyle = _a.leaveStyle, enterStyle = _a.enterStyle, transitionTimingFunction = _a.transitionTimingFunction, wrapperStyle = _a.wrapperStyle, component = _a.component, useWrapper = _a.useWrapper, others = __rest(_a, ["appearAnimate", "children", "enterDelay", "leaveDelay", "mode", "speed", "style", "leaveStyle", "enterStyle", "transitionTimingFunction", "wrapperStyle", "component", "useWrapper"]);
        return (React.createElement(react_transition_group_1.TransitionGroup, __assign({}, others, { style: __assign(__assign({}, baseStyle), (useWrapper ? wrapperStyle : leaveStyle)), component: useWrapper ? component : FirstChild }), React.Children.map(children, function (child, index) { return (React.createElement(CustomAnimateChild_1.default, { ref: function (customAnimateChild) { return _this.customAnimateChildArray[index] = customAnimateChild; }, key: child.key, enterDelay: enterDelay, leaveDelay: leaveDelay, mode: mode, style: style, speed: speed, appearAnimate: appearAnimate, leaveStyle: style ? __assign(__assign({}, style), leaveStyle) : leaveStyle, enterStyle: style ? __assign(__assign({}, style), enterStyle) : enterStyle, transitionTimingFunction: transitionTimingFunction }, useWrapper ? React.createElement("span", { style: __assign(__assign({}, baseStyle), { width: "100%" }) }, child) : child)); })));
    };
    CustomAnimate.defaultProps = {
        leaveStyle: { opacity: 0 },
        enterStyle: { opacity: 1 },
        appearAnimate: true,
        enterDelay: 0,
        leaveDelay: 0,
        mode: "in-out",
        speed: 500,
        component: "span",
        useWrapper: true
    };
    CustomAnimate.contextTypes = { theme: PropTypes.object };
    return CustomAnimate;
}(React.Component));
exports.CustomAnimate = CustomAnimate;
var slideBottomInProps = {
    leaveStyle: {
        transform: "translateY(100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateY(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    speed: 500,
    useWrapper: true
};
exports.slideBottomInProps = slideBottomInProps;
var slideTopInProps = {
    leaveStyle: {
        transform: "translateY(-100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateY(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    speed: 500,
    useWrapper: true
};
exports.slideTopInProps = slideTopInProps;
var slideLeftInProps = {
    leaveStyle: {
        transform: "translateX(-100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateX(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    speed: 500,
    useWrapper: true
};
exports.slideLeftInProps = slideLeftInProps;
var slideRightInProps = {
    leaveStyle: {
        transform: "translateX(100%)",
        opacity: 0
    },
    enterStyle: {
        transform: "translateX(0)",
        opacity: 1
    },
    wrapperStyle: { overflow: "hidden" },
    appearAnimate: true,
    speed: 500,
    useWrapper: true
};
exports.slideRightInProps = slideRightInProps;
var scaleInProps = {
    leaveStyle: {
        transform: "scale(0)",
        opacity: 0
    },
    enterStyle: {
        transform: "scale(1)",
        opacity: 1
    },
    appearAnimate: true,
    speed: 500,
    useWrapper: true
};
exports.scaleInProps = scaleInProps;
var fadeInProps = {
    leaveStyle: {
        opacity: 0
    },
    enterStyle: {
        opacity: 1
    },
    appearAnimate: true,
    speed: 500,
    useWrapper: true
};
exports.fadeInProps = fadeInProps;
exports.default = CustomAnimate;
//# sourceMappingURL=CustomAnimate.js.map