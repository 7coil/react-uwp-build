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
exports.Toast = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var react_dom_1 = require("react-dom");
var Icon_1 = require("../Icon");
var CustomAnimate_1 = require("../Animate/CustomAnimate");
var emptyFunc = function () { };
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showToast: _this.props.defaultShow
        };
        _this.addCloseDelay = function () {
            clearTimeout(_this.closeTimer);
            var _a = _this.props, closeDelay = _a.closeDelay, onToggleShowToast = _a.onToggleShowToast;
            if (closeDelay !== void 0 && _this.state.showToast) {
                _this.closeTimer = setTimeout(function () {
                    _this.setState({ showToast: false });
                    onToggleShowToast(false);
                }, closeDelay);
            }
        };
        _this.toggleShowToast = function (showToast) {
            var onToggleShowToast = _this.props.onToggleShowToast;
            if (typeof showToast === "boolean") {
                if (showToast !== _this.state.showToast) {
                    _this.setState({ showToast: showToast });
                    onToggleShowToast(showToast);
                }
            }
            else {
                _this.setState(function (prevState, prevProps) {
                    showToast = !prevState.showToast;
                    onToggleShowToast(showToast);
                    return { showToast: showToast };
                });
            }
        };
        _this.virtualRender = function () {
            var _a = _this.props, children = _a.children, defaultShow = _a.defaultShow, logoNode = _a.logoNode, title = _a.title, description = _a.description, onToggleShowToast = _a.onToggleShowToast, closeDelay = _a.closeDelay, showCloseIcon = _a.showCloseIcon, className = _a.className, key = _a.key, attributes = __rest(_a, ["children", "defaultShow", "logoNode", "title", "description", "onToggleShowToast", "closeDelay", "showCloseIcon", "className", "key"]);
            var theme = _this.context.theme;
            var styles = getStyles(_this);
            var styleClasses = theme.prepareStyles({
                className: "toast",
                styles: styles
            });
            return (React.createElement(CustomAnimate_1.default, __assign({}, CustomAnimate_1.slideRightInProps, { leaveStyle: CustomAnimate_1.slideRightInProps, appearAnimate: false, wrapperStyle: styles.root, ref: function (customAnimate) { return _this.customAnimate = customAnimate; }, key: key }),
                React.createElement("div", __assign({}, attributes, { style: styleClasses.wrapper.style, className: theme.classNames(styleClasses.wrapper.className, className) }),
                    React.createElement("div", __assign({}, styleClasses.card),
                        logoNode,
                        React.createElement("span", __assign({}, styleClasses.descContent),
                            React.createElement("p", __assign({}, styleClasses.title), title),
                            typeof description === "string" ? (React.createElement("p", __assign({}, styleClasses.description), description)) : (description && description.map(function (desc, index) { return (React.createElement("p", __assign({}, styleClasses.description, { key: "" + index }), desc)); })))),
                    showCloseIcon && (React.createElement(Icon_1.default, { style: styles.closeIcon, hoverStyle: { color: theme.baseHigh }, onClick: function () { return _this.toggleShowToast(false); } }, "ClearLegacy")),
                    children)));
        };
        return _this;
    }
    Toast.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultShow = nextProps.defaultShow;
        if (defaultShow !== this.state.showToast) {
            this.setState({ showToast: defaultShow });
        }
    };
    Toast.prototype.componentDidMount = function () {
        var theme = this.context.theme;
        theme.addToast(this);
        this.customAnimateElm = react_dom_1.findDOMNode(this.customAnimate);
        this.addCloseDelay();
    };
    Toast.prototype.componentDidUpdate = function () {
        var _this = this;
        this.context.theme.updateToast(this);
        if (!this.customAnimateElm) {
            this.customAnimateElm = react_dom_1.findDOMNode(this.customAnimate);
        }
        var style = (this.customAnimateElm || {}).style;
        if (this.state.showToast && this.customAnimateElm && style) {
            Object.assign(style, {
                height: "auto",
                margin: "10px 0"
            });
            clearTimeout(this.hiddenTimer);
        }
        else if ((!this.state.showToast) && this.customAnimateElm && style) {
            this.hiddenTimer = setTimeout(function () {
                Object.assign(style, {
                    height: "0px",
                    margin: "0px"
                });
                clearTimeout(_this.hiddenTimer);
            }, 250);
        }
        this.addCloseDelay();
    };
    Toast.prototype.componentWillUnmount = function () {
        var removeToast = this.context.theme.removeToast;
        removeToast(this);
        clearTimeout(this.hiddenTimer);
        clearTimeout(this.closeTimer);
    };
    Toast.prototype.render = function () {
        return null;
    };
    Toast.defaultProps = {
        defaultShow: false,
        onToggleShowToast: emptyFunc,
        showCloseIcon: false
    };
    Toast.contextTypes = { theme: PropTypes.object };
    return Toast;
}(React.Component));
exports.Toast = Toast;
function getStyles(Toast) {
    var theme = Toast.context.theme, _a = Toast.props, style = _a.style, showCloseIcon = _a.showCloseIcon, showToast = Toast.state.showToast;
    var prefixStyle = theme.prefixStyle;
    return {
        root: {
            display: "inherit",
            overflow: "hidden",
            transition: "transform .75s, opacity .75s",
            margin: "10px 0",
            opacity: showToast ? 1 : .5,
            transform: "translate3d(" + (showToast ? 0 : "100%") + ", 0, 0)"
        },
        wrapper: prefixStyle(__assign({ width: 320, padding: 10, position: "relative", fontSize: 14, color: theme.baseMediumHigh, background: theme.chromeLow, border: "1px solid " + theme.listLow, pointerEvents: "all", flex: "0 0 auto", overflow: "hidden", height: "auto" }, style)),
        closeIcon: {
            fontSize: 12,
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer"
        },
        card: prefixStyle({
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            fontSize: 18,
            lineHeight: 1.6
        }),
        descContent: {
            marginLeft: 10,
            marginRight: showCloseIcon ? 16 : 0,
            width: "100%"
        },
        title: {
            fontSize: 14,
            color: theme.baseHigh,
            lineHeight: 1.6
        },
        description: {
            fontSize: 12,
            color: theme.baseMedium,
            lineHeight: 1.4
        }
    };
}
exports.default = Toast;
//# sourceMappingURL=index.js.map