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
exports.Tooltip = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Throttle_1 = require("../utils/Throttle");
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showTooltip = false;
        _this.atuoCloseTimer = null;
        _this.showThrottle = new Throttle_1.Throttle();
        _this.toggleShow = function (e) {
            if (!_this.showThrottle.shouldFunctionRun())
                return;
            clearTimeout(_this.atuoCloseTimer);
            if (_this.showTooltip)
                return;
            _this.showTooltip = true;
            var classes = _this.getTooltipClasses();
            var _a = _this, tooltipElm = _a.tooltipElm, _b = _a.props, autoClose = _b.autoClose, autoCloseTimeout = _b.autoCloseTimeout;
            if (tooltipElm) {
                if (autoClose && autoCloseTimeout) {
                    _this.atuoCloseTimer = setTimeout(_this.toggleHide, autoCloseTimeout);
                }
                Object.assign(tooltipElm, classes);
            }
        };
        _this.hideThrottle = new Throttle_1.Throttle();
        _this.closeDelayTimer = null;
        _this.toggleHide = function (e) {
            if (!_this.hideThrottle.shouldFunctionRun())
                return;
            clearTimeout(_this.closeDelayTimer);
            if (!_this.showTooltip)
                return;
            _this.showTooltip = false;
            var classes = _this.getTooltipClasses();
            var _a = _this, tooltipElm = _a.tooltipElm, closeDelay = _a.props.closeDelay;
            if (tooltipElm) {
                if (closeDelay) {
                    _this.closeDelayTimer = setTimeout(function () {
                        Object.assign(tooltipElm, classes);
                    }, closeDelay);
                    return;
                }
                Object.assign(tooltipElm, classes);
            }
        };
        _this.getBaseStyle = function (showTooltip, positionStyle) {
            if (showTooltip === void 0) { showTooltip = false; }
            var _a = _this, theme = _a.context.theme, _b = _a.props, style = _b.style, background = _b.background;
            return theme.prefixStyle(__assign(__assign({ height: 28, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "4px 8px", transition: (!showTooltip && !positionStyle) ? void 0 : "transform .25s 0s ease-in-out, opacity .25s 0s ease-in-out", border: "1px solid " + (theme.useFluentDesign ? theme.listLow : theme.baseLow), color: theme.baseMediumHigh, background: background || theme.chromeMedium, opacity: showTooltip ? 1 : 0, transform: "translateY(" + (showTooltip ? "0px" : "10px") + ")", position: "absolute", fontSize: 14, pointerEvents: showTooltip ? "all" : "none", zIndex: theme.zIndex.tooltip }, style), positionStyle));
        };
        _this.getTooltipStyle = function () {
            var _a = _this, rootElm = _a.rootElm, tooltipElm = _a.tooltipElm;
            if (!(rootElm && tooltipElm))
                return _this.getBaseStyle();
            var _b = _this.props, verticalPosition = _b.verticalPosition, horizontalPosition = _b.horizontalPosition, margin = _b.margin;
            var _c = rootElm.getBoundingClientRect(), width = _c.width, height = _c.height;
            var containerWidth = tooltipElm.getBoundingClientRect().width;
            var containerHeight = tooltipElm.getBoundingClientRect().height;
            var showTooltip = _this.showTooltip;
            var positionStyle = {};
            var isVerticalCenter = verticalPosition === "center";
            if (width !== void (0) && height !== void (0)) {
                switch (horizontalPosition) {
                    case "left": {
                        positionStyle.right = isVerticalCenter ? (width + margin) : 0;
                        break;
                    }
                    case "center": {
                        positionStyle.left = (width - containerWidth) / 2;
                        break;
                    }
                    case "right": {
                        positionStyle.left = isVerticalCenter ? (-width - margin) : 0;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                switch (verticalPosition) {
                    case "top": {
                        positionStyle.top = -containerHeight - margin;
                        break;
                    }
                    case "center": {
                        positionStyle.top = (height - containerHeight) / 2;
                        break;
                    }
                    case "bottom": {
                        positionStyle.top = height + margin;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            return _this.getBaseStyle(showTooltip, positionStyle);
        };
        return _this;
    }
    Tooltip.prototype.getTooltipClasses = function () {
        var theme = this.context.theme;
        var className = this.props.className;
        var tooltipStyle = this.getTooltipStyle();
        var classes = theme.prepareStyle({
            className: "tooltip",
            style: tooltipStyle,
            extendsClassName: className
        });
        return classes;
    };
    Tooltip.prototype.render = function () {
        var _this = this;
        var _a = this.props, verticalPosition = _a.verticalPosition, autoCloseTimeout = _a.autoCloseTimeout, autoClose = _a.autoClose, margin = _a.margin, horizontalPosition = _a.horizontalPosition, children = _a.children, content = _a.content, contentNode = _a.contentNode, closeDelay = _a.closeDelay, background = _a.background, className = _a.className, attributes = __rest(_a, ["verticalPosition", "autoCloseTimeout", "autoClose", "margin", "horizontalPosition", "children", "content", "contentNode", "closeDelay", "background", "className"]);
        var theme = this.context.theme;
        var tooltipStyle = this.getTooltipStyle();
        var classes = theme.prepareStyle({
            className: "tooltip",
            style: tooltipStyle,
            extendsClassName: className
        });
        return (React.createElement("div", { style: { position: "relative", display: "inline-block" }, ref: function (rootElm) { return _this.rootElm = rootElm; }, onMouseEnter: this.toggleShow, onClick: this.toggleShow, onMouseLeave: this.toggleHide },
            React.createElement("span", __assign({ ref: function (tooltipElm) { return _this.tooltipElm = tooltipElm; } }, attributes, classes), content || contentNode),
            children));
    };
    Tooltip.contextTypes = { theme: PropTypes.object };
    Tooltip.defaultProps = {
        verticalPosition: "top",
        horizontalPosition: "center",
        margin: 4,
        autoClose: false,
        autoCloseTimeout: 750,
        closeDelay: 0
    };
    return Tooltip;
}(React.Component));
exports.Tooltip = Tooltip;
exports.default = Tooltip;
//# sourceMappingURL=index.js.map