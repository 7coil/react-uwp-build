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
exports.DropDownMenu = exports.defaultStyle = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var Icon_1 = require("../Icon");
var RevealEffect_1 = require("../RevealEffect");
exports.defaultStyle = {
    display: "inline-block",
    width: 296,
    height: 32
};
var DropDownMenu = /** @class */ (function (_super) {
    __extends(DropDownMenu, _super);
    function DropDownMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currValue: _this.props.defaultValue || Array.isArray(_this.props.values) && _this.props.values[0],
            currValues: _this.props.values
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            _this.addBlurEvent.setConfig({
                addListener: _this.state.showList,
                clickExcludeElm: _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        showList: false
                    });
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        _this.updateItemHeight = function (needUpdate) {
            if (needUpdate === void 0) { needUpdate = true; }
            if (_this.rootElm && needUpdate) {
                _this.itemHeight = window.getComputedStyle(_this.rootElm).height;
            }
        };
        _this.toggleShowList = function (currentValue) {
            var showList = _this.state.showList;
            if (currentValue !== _this.state.currValue) {
                _this.props.onChangeValue && _this.props.onChangeValue(currentValue);
            }
            _this.setState({
                currValue: currentValue,
                showList: !showList
            });
        };
        _this.getValue = function () { return _this.state.currValue; };
        return _this;
    }
    DropDownMenu.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
        this.updateItemHeight();
    };
    DropDownMenu.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
        this.updateItemHeight(!this.state.showList);
    };
    DropDownMenu.prototype.componentWillReceiveProps = function () {
        this.updateItemHeight();
    };
    DropDownMenu.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    DropDownMenu.prototype.render = function () {
        var _this = this;
        var _a = this.props, values = _a.values, defaultValue = _a.defaultValue, onChangeValue = _a.onChangeValue, style = _a.style, wrapperStyle = _a.wrapperStyle, revealConfig = _a.revealConfig, enableFullWidth = _a.enableFullWidth, itemStyle = _a.itemStyle, itemHoverStyle = _a.itemHoverStyle, itemSelectedStyle = _a.itemSelectedStyle, iconNode = _a.iconNode, attributes = __rest(_a, ["values", "defaultValue", "onChangeValue", "style", "wrapperStyle", "revealConfig", "enableFullWidth", "itemStyle", "itemHoverStyle", "itemSelectedStyle", "iconNode"]);
        var _b = this.state, showList = _b.showList, currentValue = _b.currValue, currentValues = _b.currValues;
        var theme = this.context.theme;
        var styles = getStyles(this);
        var classes = theme.prepareStyles({
            className: "dropDownMenu",
            styles: styles
        });
        var defaultItemSelectedStyle = {
            background: theme.listAccentLow
        };
        var newWrapperStyle = Object.assign({}, exports.defaultStyle, style);
        return (React.createElement("span", __assign({}, classes.wrapper),
            React.createElement("div", __assign({}, attributes, classes.root, { ref: function (rootElm) { return _this.rootElm = rootElm; } }), currentValues.map(function (value, index) {
                var isCurrent = currentValue === value;
                return (React.createElement("div", { className: classes[isCurrent ? "selectedItem" : "item"].className, style: __assign(__assign(__assign({}, classes.item.style), (isCurrent && showList ? (itemSelectedStyle || defaultItemSelectedStyle) : void 0)), { height: showList ? ((newWrapperStyle && newWrapperStyle.height) ? newWrapperStyle.height : _this.itemHeight) : (isCurrent ? "100%" : 0), padding: showList || isCurrent ? styles.item.padding : 0 }), onClick: function () { return _this.toggleShowList(value); }, key: index },
                    React.createElement("p", __assign({}, classes.valueContent), value),
                    !showList && isCurrent ? iconNode : null,
                    showList && React.createElement(RevealEffect_1.default, __assign({}, revealConfig, { effectRange: showList ? "self" : "all" }))));
            }))));
    };
    DropDownMenu.contextTypes = { theme: PropTypes.object };
    DropDownMenu.defaultProps = {
        iconNode: React.createElement(Icon_1.default, { style: { marginLeft: 8 } }, "ChevronDown4Legacy")
    };
    return DropDownMenu;
}(React.Component));
exports.DropDownMenu = DropDownMenu;
exports.default = DropDownMenu;
function getStyles(dropDownMenu) {
    var theme = dropDownMenu.context.theme, _a = dropDownMenu.props, style = _a.style, wrapperStyle = _a.wrapperStyle, enableFullWidth = _a.enableFullWidth, itemHoverStyle = _a.itemHoverStyle, itemStyle = _a.itemStyle, itemHeight = dropDownMenu.itemHeight, showList = dropDownMenu.state.showList;
    var prefixStyle = theme.prefixStyle;
    var newWrapperStyle = Object.assign({}, exports.defaultStyle, style);
    var zIndex = (style && style.zIndex) ? style.zIndex : (showList ? theme.zIndex.dropDownMenu : 1);
    var defaultItemHoverStyle = {
        background: theme.baseLow
    };
    var newItemStyle = __assign(__assign({ border: theme.borderWidth + "px solid transparent", position: "relative", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", background: "none", padding: "0 8px" }, itemStyle), { height: showList ? ((newWrapperStyle && newWrapperStyle.height) ? newWrapperStyle.height : itemHeight) : 0, borderLeft: showList ? "0px solid transparent" : "none", borderRight: showList ? "0px solid transparent" : "none", borderTop: showList ? theme.borderWidth + "px solid transparent" : "none", borderBottom: showList ? theme.borderWidth + "px solid transparent" : "none" });
    return {
        wrapper: prefixStyle(__assign({ flex: "0 0 auto", display: "block", width: enableFullWidth ? "100%" : newWrapperStyle.width, height: newWrapperStyle.height }, wrapperStyle)),
        root: prefixStyle(__assign(__assign(__assign({ position: "relative", verticalAlign: "middle", border: theme.borderWidth + "px solid " + theme.baseLow, overflowX: "hidden", padding: showList ? "6px 0" : 0, transition: "all .25s 0s ease-in-out" }, theme.acrylicTexture60.style), newWrapperStyle), { zIndex: zIndex, width: enableFullWidth ? (style && style.width !== void 0 ? newWrapperStyle.width : "100%") : newWrapperStyle.width, height: showList ? "auto" : newWrapperStyle.height })),
        item: prefixStyle(__assign(__assign({}, newItemStyle), { "&:hover": itemHoverStyle || defaultItemHoverStyle })),
        selectedItem: prefixStyle(newItemStyle),
        valueContent: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textAlign: "left",
            cursor: "default",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            wordWrap: "normal",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        }
    };
}
//# sourceMappingURL=index.js.map