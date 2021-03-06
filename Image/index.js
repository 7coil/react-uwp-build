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
exports.Image = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var ReactLazyLoad = require("react-lazyload").default;
var Icon_1 = require("../Icon");
var Placeholder = /** @class */ (function (_super) {
    __extends(Placeholder, _super);
    function Placeholder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Placeholder.prototype.render = function () {
        var _a = this.props, style = _a.style, attributes = __rest(_a, ["style"]);
        var theme = this.context.theme;
        return (React.createElement("div", __assign({}, attributes, { style: theme.prefixStyle(__assign({ background: theme.chromeMedium, padding: 20, display: "inline-block", verticalAlign: "middle", cursor: "default" }, style)) }),
            React.createElement(Icon_1.default, { style: {
                    color: theme.baseMedium,
                    fontSize: 80,
                    verticalAlign: "middle",
                    display: "block"
                }, hoverStyle: {} }, "\uEB9F")));
    };
    Placeholder.contextTypes = { theme: PropTypes.object };
    return Placeholder;
}(React.Component));
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showEmptyImage: false
        };
        _this.errorHandler = function (e) { return _this.setState({ showEmptyImage: true }); };
        return _this;
    }
    Image.prototype.render = function () {
        var _this = this;
        var _a = this.props, useLazyLoad = _a.useLazyLoad, useDivContainer = _a.useDivContainer, once = _a.once, scroll = _a.scroll, offset = _a.offset, overflow = _a.overflow, resize = _a.resize, debounce = _a.debounce, throttle = _a.throttle, style = _a.style, placeholder = _a.placeholder, attributes = __rest(_a, ["useLazyLoad", "useDivContainer", "once", "scroll", "offset", "overflow", "resize", "debounce", "throttle", "style", "placeholder"]);
        var theme = this.context.theme;
        var currPlaceholder = (placeholder || React.createElement(Placeholder, __assign({ style: style }, attributes)));
        var baseStyle = theme.prefixStyle(__assign({ background: "url(" + attributes.src + ") no-repeat center center / cover", display: "inline-block", verticalAlign: "middle" }, style));
        var ImageOrDiv = function () { return (useDivContainer ?
            React.createElement("div", __assign({}, attributes, { style: baseStyle }))
            : React.createElement("img", __assign({}, attributes, { style: baseStyle, onError: _this.errorHandler }))); };
        if (!attributes.src || this.state.showEmptyImage) {
            return useLazyLoad ? currPlaceholder : null;
        }
        if (useLazyLoad) {
            return (React.createElement(ReactLazyLoad, __assign({}, {
                once: once,
                scroll: scroll,
                offset: offset,
                overflow: overflow,
                resize: resize,
                debounce: debounce,
                throttle: throttle
            }, { height: attributes.height, placeholder: currPlaceholder }),
                React.createElement(ImageOrDiv, null)));
        }
        return React.createElement(ImageOrDiv, null);
    };
    Image.defaultProps = {
        useLazyLoad: false,
        useDivContainer: false,
        once: true,
        offset: 0,
        scroll: true,
        overflow: false,
        throttle: 60
    };
    Image.contextTypes = { theme: PropTypes.object };
    return Image;
}(React.Component));
exports.Image = Image;
exports.default = Image;
//# sourceMappingURL=index.js.map