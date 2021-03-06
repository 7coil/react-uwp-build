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
exports.MenuItem = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var Icon_1 = require("../Icon");
var PseudoClasses_1 = require("../PseudoClasses");
var RevealEffect_1 = require("../RevealEffect");
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            expanded: _this.props.defaultExpanded
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            _this.addBlurEvent.setConfig({
                addListener: _this.state.expanded,
                clickExcludeElm: _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        expanded: false
                    });
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        _this.toggleExpanded = function (expanded) {
            if (typeof expanded === "boolean") {
                if (expanded !== _this.state.expanded) {
                    _this.setState({ expanded: expanded });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    expanded: !prevState.expanded
                }); });
            }
        };
        return _this;
    }
    MenuItem.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultExpanded = nextProps.defaultExpanded;
        var expanded = this.state.expanded;
        if (defaultExpanded !== void 0 && defaultExpanded !== expanded) {
            this.setState({ expanded: defaultExpanded });
        }
    };
    MenuItem.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    MenuItem.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    MenuItem.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    MenuItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, icon = _a.icon, label = _a.label, itemWidth = _a.itemWidth, itemHeight = _a.itemHeight, children = _a.children, defaultExpanded = _a.defaultExpanded, className = _a.className, hoverStyle = _a.hoverStyle, expandedMethod = _a.expandedMethod, revealConfig = _a.revealConfig, attributes = __rest(_a, ["icon", "label", "itemWidth", "itemHeight", "children", "defaultExpanded", "className", "hoverStyle", "expandedMethod", "revealConfig"]);
        var theme = this.context.theme;
        var expanded = this.state.expanded;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "menu",
            styles: inlineStyles
        });
        var isHoverToggled = expandedMethod === "hover";
        var iconProps = {
            size: itemHeight,
            style: { fontSize: itemHeight / 3 }
        };
        return (React.createElement(PseudoClasses_1.default, __assign({}, attributes, { className: theme.classNames(styles.root.className, className), style: styles.root.style, onMouseEnter: isHoverToggled ? function () { return _this.toggleExpanded(true); } : void 0, onMouseLeave: isHoverToggled ? function () { return _this.toggleExpanded(false); } : void 0 }),
            React.createElement("div", { ref: function (rootElm) { return _this.rootElm = rootElm; } },
                React.createElement(Icon_1.default, __assign({}, iconProps), icon),
                React.createElement("span", __assign({}, styles.label), label),
                children && (React.createElement(Icon_1.default, __assign({}, iconProps, { style: {
                        fontSize: itemHeight / 3,
                        cursor: "pointer",
                        pointerEvents: "all"
                    }, onClick: isHoverToggled ? void 0 : this.toggleExpanded }), "ScrollChevronRightLegacy")),
                children && (React.createElement("div", __assign({}, styles.child), children && React.Children.map(children, function (child, index) {
                    return child.type === MenuItem ? React.cloneElement(child, {
                        itemWidth: itemWidth,
                        itemHeight: itemHeight,
                        hoverStyle: hoverStyle,
                        expandedMethod: expandedMethod
                    }) : child;
                }))),
                React.createElement(RevealEffect_1.default, __assign({ effectRange: "self" }, revealConfig)))));
    };
    MenuItem.defaultProps = {
        itemWidth: 240,
        itemHeight: 44,
        expandedMethod: "hover"
    };
    MenuItem.contextTypes = { theme: PropTypes.object };
    return MenuItem;
}(React.Component));
exports.MenuItem = MenuItem;
function getStyles(menuItem) {
    var theme = menuItem.context.theme, _a = menuItem.props, hoverStyle = _a.hoverStyle, children = _a.children, style = _a.style, itemWidth = _a.itemWidth, itemHeight = _a.itemHeight, expanded = menuItem.state.expanded;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ position: "relative", border: theme.borderWidth + "px solid transparent", borderWidth: theme.borderWidth + "px 0px", display: "flex", flexDirection: "row", alignItems: "center", cursor: "default", height: itemHeight, fontSize: itemHeight / 3, lineHeight: itemHeight + "px", width: "100%", 
            // position: children ? "relative" : void 0,
            "&:hover": hoverStyle || {
                background: theme.listLow
            } }, style)),
        label: {
            width: itemWidth - itemHeight - (children ? itemHeight : 0),
            height: itemHeight,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        },
        child: prefixStyle(__assign(__assign({}, theme.acrylicTexture60.style), { transform: "translate3d(" + (expanded ? 0 : "-" + itemHeight + "px") + ", 0, 0)", opacity: expanded ? 1 : 0, pointerEvents: expanded ? "all" : "none", transition: "all .25s", position: "absolute", top: -1, left: "100%", width: "100%", border: "1px solid " + theme.listLow }))
    };
}
exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map