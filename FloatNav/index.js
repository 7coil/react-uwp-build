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
exports.FloatNav = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var IconButton_1 = require("../IconButton");
var emptyFunc = function () { };
var FloatNav = /** @class */ (function (_super) {
    __extends(FloatNav, _super);
    function FloatNav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currFocusItemIndex: _this.props.focusItemIndex,
            hoverItem: null,
            hoverIndexArray: []
        };
        _this.focusIndex = function (currFocusItemIndex) { return _this.setState({ currFocusItemIndex: currFocusItemIndex }); };
        _this.getFocusIndex = function () { return _this.state.currFocusItemIndex; };
        _this.getItems = function () { return _this.props.expandedItems; };
        return _this;
    }
    FloatNav.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            currFocusItemIndex: nextProps.focusItemIndex
        });
    };
    FloatNav.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    };
    FloatNav.prototype.render = function () {
        var _this = this;
        var _a = this.props, expandedItems = _a.expandedItems, onFocusItem = _a.onFocusItem, topNode = _a.topNode, bottomNode = _a.bottomNode, isFloatRight = _a.isFloatRight, expandedWidth = _a.expandedWidth, initWidth = _a.initWidth, focusItemIndex = _a.focusItemIndex, className = _a.className, revealConfig = _a.revealConfig, attributes = __rest(_a, ["expandedItems", "onFocusItem", "topNode", "bottomNode", "isFloatRight", "expandedWidth", "initWidth", "focusItemIndex", "className", "revealConfig"]);
        var theme = this.context.theme;
        var _b = this.state, currFocusItemIndex = _b.currFocusItemIndex, hoverItem = _b.hoverItem, hoverIndexArray = _b.hoverIndexArray;
        var itemStyle = theme.prefixStyle({
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: theme.altHigh,
            transition: "all .25s 0s cubic-bezier(.04, .89, .44, 1.07)",
            fontSize: 12
        });
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "float-nav",
            styles: inlineStyles
        });
        return (React.createElement("div", __assign({}, attributes, { style: styles.root.style, className: theme.classNames(styles.root.className, className) }),
            React.createElement("div", __assign({}, attributes, styles.wrapper),
                React.Children.map(topNode, function (child, index) { return (React.createElement("div", { key: "" + index, style: theme.prefixStyle(__assign(__assign({}, itemStyle), { width: initWidth, height: initWidth })) }, React.cloneElement(child, { style: __assign(__assign({}, child.props.style), { width: initWidth, height: initWidth }) }))); }),
                expandedItems.map(function (item, index) {
                    var iconNode = item.iconNode, focusColor = item.focusColor, title = item.title, href = item.href, onClick = item.onClick;
                    var isFirst = currFocusItemIndex === index;
                    var isHovered = hoverItem === index;
                    var padding = initWidth / 2;
                    var linkStyle = theme.prefixStyle({
                        position: "relative",
                        overflow: "hidden",
                        borderTop: theme.borderWidth + "px solid transparent",
                        borderBottom: theme.borderWidth + "px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        boxSizing: "border-box",
                        transition: "all .25s",
                        textDecoration: "none",
                        height: initWidth
                    });
                    var linkStyleClasses = theme.prepareStyle({
                        className: "float-nav-link",
                        style: linkStyle
                    });
                    return (React.createElement("a", { onMouseEnter: function (e) {
                            hoverIndexArray[index] = true;
                            _this.setState({ hoverItem: index, hoverIndexArray: hoverIndexArray });
                        }, onMouseLeave: function () {
                            hoverIndexArray[index] = false;
                            _this.setState({ hoverItem: void (0), hoverIndexArray: hoverIndexArray });
                        }, href: href, onClick: function (e) { onFocusItem(index); if (onClick)
                            onClick(e); }, style: theme.prefixStyle(__assign(__assign({}, linkStyleClasses.style), { flexDirection: isFloatRight ? "row" : "row-reverse", justifyContent: isHovered ? "space-between" : "center", color: hoverIndexArray[index] ? "#fff" : theme.baseHigh, background: (isFirst || isHovered) ? (theme.accent || focusColor) : theme.altHigh, width: hoverIndexArray[index] ? expandedWidth : initWidth })), className: linkStyleClasses.className, key: "" + index },
                        isHovered && React.createElement("span", { style: { cursor: "default", color: "#fff", margin: "0 " + padding + "px", whiteSpace: "nowrap" } }, title),
                        iconNode.type === IconButton_1.default ? (React.cloneElement(iconNode, {
                            style: { color: hoverIndexArray[index] || isFirst ? "#fff" : theme.baseHigh }
                        })) : iconNode));
                }),
                React.Children.map(bottomNode, function (child, index) { return (React.createElement("div", { key: "" + index, style: theme.prefixStyle(__assign(__assign({}, itemStyle), { width: initWidth, height: initWidth })) }, React.cloneElement(child, {
                    style: __assign(__assign({}, child.props.style), { width: initWidth, height: initWidth })
                }))); }))));
    };
    FloatNav.defaultProps = {
        onFocusItem: emptyFunc,
        expandedItems: [],
        initWidth: 48,
        isFloatRight: true,
        expandedWidth: 240
    };
    FloatNav.contextTypes = { theme: PropTypes.object };
    return FloatNav;
}(React.Component));
exports.FloatNav = FloatNav;
function getStyles(floatNav) {
    var _a = floatNav.props, style = _a.style, initWidth = _a.initWidth, isFloatRight = _a.isFloatRight, theme = floatNav.context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ width: 48, background: theme.altHigh }, style)),
        wrapper: prefixStyle({
            width: initWidth,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isFloatRight ? "flex-end" : "flex-start"
        }),
        button: {
            background: theme.accent,
            color: "#fff"
        }
    };
}
exports.default = FloatNav;
//# sourceMappingURL=index.js.map