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
exports.ListView = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var PseudoClasses_1 = require("../PseudoClasses");
var RevealEffect_1 = require("../RevealEffect");
var Separator_1 = require("../Separator");
var AppBarSeparator_1 = require("../AppBarSeparator");
var emptyFunc = function () { };
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focusIndex: _this.props.defaultFocusListIndex
        };
        _this.inlineStyles = null;
        _this.getItemNode = function (itemNode, index, disabled, focus, style, onClick) {
            var _a = _this.props, revealConfig = _a.revealConfig, enableResizeObserver = _a.enableResizeObserver;
            var inlineStyles = _this.inlineStyles;
            var theme = _this.context.theme;
            var _b = _this.props, onChooseItem = _b.onChooseItem, background = _b.background;
            var focusIndex = _this.state.focusIndex;
            var isFocus = focus || focusIndex === index;
            var defaultBG = isFocus ? theme.listAccentLow : "none";
            var itemStyles = theme.prepareStyle({
                className: "list-view-item",
                style: theme.prefixStyle(__assign(__assign(__assign(__assign(__assign({}, inlineStyles.item), { flex: "0 0 auto", position: "relative", background: defaultBG, borderTop: "1px solid transparent", borderBottom: "1px solid transparent", color: disabled ? theme.baseLow : theme.baseHigh }), (isFocus ? theme.acrylicTexture40.style : theme.acrylicTexture60.style)), { "&:hover": __assign({}, (isFocus ? theme.acrylicTexture20.style : theme.acrylicTexture60.style)), "&:active": {
                        transform: "scale(0.99)"
                    } }), style))
            });
            var isSeparator = itemNode && typeof itemNode === "object" && (itemNode.type === Separator_1.default || itemNode.type === AppBarSeparator_1.default);
            return (React.createElement(PseudoClasses_1.default, __assign({}, itemStyles, { key: "" + index }),
                React.createElement("div", { onClick: onClick, onMouseDown: disabled ? void 0 : function (e) {
                        onChooseItem(index);
                    } },
                    itemNode,
                    !isSeparator && React.createElement(RevealEffect_1.default, __assign({}, revealConfig)))));
        };
        return _this;
    }
    ListView.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.defaultFocusListIndex !== this.state.focusIndex) {
            this.setState({ focusIndex: nextProps.defaultFocusListIndex });
        }
    };
    ListView.prototype.render = function () {
        var _this = this;
        var _a = this.props, listSource = _a.listSource, listItemStyle = _a.listItemStyle, onChooseItem = _a.onChooseItem, background = _a.background, defaultFocusListIndex = _a.defaultFocusListIndex, revealConfig = _a.revealConfig, enableResizeObserver = _a.enableResizeObserver, attributes = __rest(_a, ["listSource", "listItemStyle", "onChooseItem", "background", "defaultFocusListIndex", "revealConfig", "enableResizeObserver"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "list-view",
            styles: inlineStyles
        });
        this.inlineStyles = inlineStyles;
        var listSourceAny = listSource;
        return (React.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, attributes, styles.root), listSourceAny && listSourceAny.map(function (listItem, index) {
            if (React.isValidElement(listItem)) {
                var props = listItem.props;
                var disabled = props.disabled, focus_1 = props.focus, style = props.style, onClick = props.onClick;
                return _this.getItemNode(listItem, index, disabled, focus_1, style, onClick);
            }
            else if (typeof listItem === "string" || typeof listItem === "number") {
                return _this.getItemNode(listItem, index);
            }
            else if (typeof listItem === "object" && listItem.itemNode) {
                var itemNode = listItem.itemNode, disabled = listItem.disabled, focus_2 = listItem.focus, style = listItem.style, onClick = listItem.onClick;
                return _this.getItemNode(itemNode, index, disabled, focus_2, style, onClick);
            }
            else {
                return null;
            }
        })));
    };
    ListView.defaultProps = {
        onChooseItem: emptyFunc,
        revealConfig: { effectRange: "self" }
    };
    ListView.contextTypes = { theme: PropTypes.object };
    return ListView;
}(React.Component));
exports.ListView = ListView;
function getStyles(listView) {
    var context = listView.context, _a = listView.props, listItemStyle = _a.listItemStyle, background = _a.background, style = _a.style;
    var theme = context.theme;
    return {
        root: theme.prefixStyle(__assign({ width: 320, display: "inline-block", verticalAlign: "middle", fontSize: 14, padding: "8px 0", color: theme.baseMediumHigh, border: "1px solid " + (theme.useFluentDesign ? theme.listLow : theme.altHigh), transition: "all .25s" }, style)),
        item: theme.prefixStyle(__assign({ cursor: "default", padding: 8, width: "100%", transition: "all 0.25s" }, listItemStyle))
    };
}
exports.default = ListView;
//# sourceMappingURL=index.js.map