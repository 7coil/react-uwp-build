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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollReveal = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var react_dom_1 = require("react-dom");
var CustomAnimate_1 = require("../Animate/CustomAnimate");
var ScrollReveal = /** @class */ (function (_super) {
    __extends(ScrollReveal, _super);
    function ScrollReveal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElm = null;
        _this.animated = false;
        _this.setEnterStyle = function () {
            _this.customAnimate.setEnterStyle();
        };
        _this.setLeaveStyle = function () {
            _this.customAnimate.setLeaveStyle();
        };
        return _this;
    }
    ScrollReveal.prototype.componentDidMount = function () {
        this.rootElm = react_dom_1.findDOMNode(this);
        this.context.theme.scrollReveals.push(this);
    };
    ScrollReveal.prototype.componentDidUpdate = function () {
        if (!this.context.theme.scrollReveals.includes(this)) {
            this.context.theme.scrollReveals.push(this);
        }
    };
    ScrollReveal.prototype.componentWillUnmount = function () {
        var scrollReveals = this.context.theme.scrollReveals;
        scrollReveals.splice(scrollReveals.indexOf(this), 1);
    };
    ScrollReveal.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, leaveStyle = _a.leaveStyle, enterStyle = _a.enterStyle, speed = _a.speed, transitionTimingFunction = _a.transitionTimingFunction, useWrapper = _a.useWrapper, wrapperStyle = _a.wrapperStyle, children = _a.children;
        var theme = this.context.theme;
        return (React.createElement(CustomAnimate_1.default, { ref: function (customAnimate) { return _this.customAnimate = customAnimate; }, speed: speed, transitionTimingFunction: transitionTimingFunction, style: style, leaveStyle: leaveStyle, enterStyle: enterStyle, appearAnimate: false, useWrapper: useWrapper, wrapperStyle: wrapperStyle }, children));
    };
    ScrollReveal.defaultProps = {
        leaveStyle: { transform: "scale(0)" },
        enterStyle: { transform: "scale(1)" },
        speed: 250,
        topOffset: 0,
        bottomOffset: 0,
        useWrapper: false
    };
    ScrollReveal.contextTypes = { theme: PropTypes.object };
    return ScrollReveal;
}(React.Component));
exports.ScrollReveal = ScrollReveal;
exports.default = ScrollReveal;
var CustomAnimate_2 = require("../Animate/CustomAnimate");
Object.defineProperty(exports, "fadeInProps", { enumerable: true, get: function () { return CustomAnimate_2.fadeInProps; } });
Object.defineProperty(exports, "scaleInProps", { enumerable: true, get: function () { return CustomAnimate_2.scaleInProps; } });
Object.defineProperty(exports, "slideTopInProps", { enumerable: true, get: function () { return CustomAnimate_2.slideTopInProps; } });
Object.defineProperty(exports, "slideBottomInProps", { enumerable: true, get: function () { return CustomAnimate_2.slideBottomInProps; } });
Object.defineProperty(exports, "slideLeftInProps", { enumerable: true, get: function () { return CustomAnimate_2.slideLeftInProps; } });
Object.defineProperty(exports, "slideRightInProps", { enumerable: true, get: function () { return CustomAnimate_2.slideRightInProps; } });
//# sourceMappingURL=index.js.map