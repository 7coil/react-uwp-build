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
var emptyFunc = function () { };
var FlyoutContent = /** @class */ (function (_super) {
    __extends(FlyoutContent, _super);
    function FlyoutContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showFlyoutContent: _this.props.show
        };
        _this.autoHideTimer = null;
        _this.hideTimer = null;
        _this.showFlyoutContent = function () {
            clearTimeout(_this.autoHideTimer);
            clearTimeout(_this.hideTimer);
            _this.toggleShowFlyoutContent(true);
            var now = Date.now();
            if (_this.props.autoClose) {
                _this.autoHideTimer = setTimeout(function () {
                    _this.hideFlyoutContent();
                }, _this.props.autoCloseTimeout);
            }
        };
        _this.hideFlyoutContent = function () {
            _this.hideTimer = setTimeout(function () {
                _this.toggleShowFlyoutContent(false);
            }, 250);
        };
        _this.toggleShowFlyoutContent = function (showFlyoutContent) {
            if (typeof showFlyoutContent === "boolean") {
                if (showFlyoutContent !== _this.state.showFlyoutContent) {
                    _this.setState({ showFlyoutContent: showFlyoutContent });
                }
            }
            else {
                _this.setState({
                    showFlyoutContent: !_this.state.showFlyoutContent
                });
            }
        };
        _this.getStaticStyle = function (showFlyoutContent) {
            if (showFlyoutContent === void 0) { showFlyoutContent = _this.state.showFlyoutContent; }
            var _a = _this, theme = _a.context.theme, style = _a.props.style;
            var enterDelay = showFlyoutContent ? _this.props.enterDelay : 0;
            return theme.prefixStyle(__assign({ width: 280, boxSizing: "content-box", padding: 8, border: "1px solid " + theme.baseLow, color: theme.baseMediumHigh, background: theme.chromeLow, pointerEvents: showFlyoutContent ? "all" : "none", opacity: showFlyoutContent ? 1 : 0, transform: "translateY(" + (showFlyoutContent ? "0px" : "10px") + ")", position: "absolute", zIndex: theme.zIndex.flyout, transition: "transform .25s " + enterDelay + "ms ease-in-out, opacity .25s " + enterDelay + "ms ease-in-out, border " + enterDelay + "ms .25s ease-in-out" }, style));
        };
        _this.getDynamicStyle = function (unit) {
            if (unit === void 0) { unit = ""; }
            var rootElm = _this.rootElm;
            if (!rootElm)
                return;
            var parentElement = rootElm.parentElement;
            var _a = _this.props, verticalPosition = _a.verticalPosition, horizontalPosition = _a.horizontalPosition, margin = _a.margin;
            var showFlyoutContent = _this.state.showFlyoutContent;
            var _b = parentElement.getBoundingClientRect(), width = _b.width, height = _b.height;
            var containerWidth = rootElm.getBoundingClientRect().width;
            var containerHeight = rootElm.getBoundingClientRect().height;
            var positionStyle = {};
            if (width !== void (0) && height !== void (0)) {
                switch (horizontalPosition) {
                    case "left": {
                        positionStyle.right = unit ? "0" + unit : 0;
                        break;
                    }
                    case "center": {
                        var left = (width - containerWidth) / 2;
                        positionStyle.left = unit ? "" + left + unit : left;
                        break;
                    }
                    case "right": {
                        positionStyle.left = unit ? "0" + unit : 0;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                switch (verticalPosition) {
                    case "top": {
                        var top_1 = -containerHeight - margin;
                        positionStyle.top = unit ? "" + top_1 + unit : top_1;
                        break;
                    }
                    case "center": {
                        var top_2 = (height - containerHeight) / 2;
                        positionStyle.top = unit ? "" + top_2 + unit : top_2;
                        break;
                    }
                    case "bottom": {
                        var top_3 = height + margin;
                        positionStyle.top = unit ? "" + top_3 + unit : top_3;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            return positionStyle;
        };
        _this.handelMouseEnter = function (e) {
            clearTimeout(_this.autoHideTimer);
            clearTimeout(_this.hideTimer);
            e.currentTarget.style.border = "1px solid " + _this.context.theme.listAccentLow;
            if (!_this.props.isControlled)
                _this.showFlyoutContent();
            _this.props.onMouseEnter(e);
        };
        _this.handelMouseLeave = function (e) {
            e.currentTarget.style.border = "1px solid " + _this.context.theme.baseLow;
            _this.hideFlyoutContent();
            _this.props.onMouseLeave(e);
        };
        return _this;
    }
    FlyoutContent.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.state.showFlyoutContent !== nextProps.show) {
            this.setState({ showFlyoutContent: nextProps.show });
        }
    };
    FlyoutContent.prototype.componentDidMount = function () {
        Object.assign(this.rootElm.style, this.getDynamicStyle("px"));
        if (!this.props.isControlled) {
            this.rootElm.parentElement.addEventListener("mouseenter", this.showFlyoutContent);
            this.rootElm.parentElement.addEventListener("mouseleave", this.hideFlyoutContent);
        }
    };
    FlyoutContent.prototype.componentWillUnmount = function () {
        clearTimeout(this.autoHideTimer);
        if (!this.props.isControlled) {
            this.rootElm.parentElement.removeEventListener("mouseenter", this.showFlyoutContent);
            this.rootElm.parentElement.removeEventListener("mouseleave", this.hideFlyoutContent);
        }
    };
    FlyoutContent.prototype.render = function () {
        var _this = this;
        var _a = this.props, verticalPosition = _a.verticalPosition, enterDelay = _a.enterDelay, isControlled = _a.isControlled, margin = _a.margin, horizontalPosition = _a.horizontalPosition, show = _a.show, autoClose = _a.autoClose, autoCloseTimeout = _a.autoCloseTimeout, children = _a.children, attributes = __rest(_a, ["verticalPosition", "enterDelay", "isControlled", "margin", "horizontalPosition", "show", "autoClose", "autoCloseTimeout", "children"]);
        var theme = this.context.theme;
        var staticStyle = this.getStaticStyle();
        var stylesClasses = theme.prepareStyle({
            className: "flyout-content",
            style: staticStyle
        });
        var dynamicStyle = this.getDynamicStyle();
        return (React.createElement("div", __assign({}, attributes, { onMouseEnter: this.handelMouseEnter, onMouseLeave: this.handelMouseLeave, ref: function (rootElm) { return _this.rootElm = rootElm; }, style: dynamicStyle ? __assign(__assign({}, stylesClasses.style), dynamicStyle) : stylesClasses.style, className: stylesClasses.className }), children));
    };
    FlyoutContent.defaultProps = {
        verticalPosition: "top",
        horizontalPosition: "center",
        margin: 4,
        isControlled: false,
        enterDelay: 0,
        onMouseLeave: emptyFunc,
        onMouseEnter: emptyFunc,
        autoClose: false,
        autoCloseTimeout: 1250
    };
    FlyoutContent.contextTypes = { theme: PropTypes.object };
    return FlyoutContent;
}(React.Component));
exports.default = FlyoutContent;
//# sourceMappingURL=index.js.map