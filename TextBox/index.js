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
exports.TextBox = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var RevealEffect_1 = require("../RevealEffect");
var emptyFunc = function () { };
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.handleClick = function (e) {
            _this.setState({ hovered: false });
        };
        _this.handleHover = function (e) {
            _this.setState({ hovered: true });
            _this.handleBlur = function () { };
        };
        _this.handleUnHover = function (e) {
            _this.setState({ hovered: false });
            _this.handleBlur = function (e) {
                _this.setState({ focused: false });
                _this.props.onBlur(e);
            };
        };
        _this.handleFocus = function (e) {
            _this.setState({ focused: true });
            _this.props.onFocus(e);
        };
        _this.handleBlur = function (e) {
            _this.setState({ focused: false });
            _this.props.onBlur(e);
        };
        _this.setValue = function (value) { return _this.inputElm.value = value; };
        _this.getValue = function () { return _this.inputElm.value; };
        return _this;
    }
    TextBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, hoverStyle = _a.hoverStyle, focusStyle = _a.focusStyle, leftNode = _a.leftNode, rightNode = _a.rightNode, style = _a.style, className = _a.className, textBoxStyle = _a.textBoxStyle, onChange = _a.onChange, onChangeValue = _a.onChangeValue, children = _a.children, background = _a.background, attributes = __rest(_a, ["hoverStyle", "focusStyle", "leftNode", "rightNode", "style", "className", "textBoxStyle", "onChange", "onChangeValue", "children", "background"]);
        var _b = this.state, hovered = _b.hovered, focused = _b.focused;
        var haveChild = leftNode || rightNode || children;
        var theme = this.context.theme;
        var currBackground = (background === void 0 ? theme.altHigh : background);
        var hoverProps = {
            onMouseEnter: this.handleHover,
            onMouseLeave: this.handleUnHover
        };
        var rootWrapperStyle = {
            position: "relative",
            lineHeight: "32px",
            height: 32,
            width: 296,
            padding: !haveChild ? "0 8px" : 0,
            fontSize: 14,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: focused ? "#000" : theme.baseHigh,
            background: focused ? "#fff" : currBackground || "none",
            border: focused ? theme.borderWidth + "px solid " + theme.accent : hovered ? theme.borderWidth + "px solid " + theme.baseMedium : theme.borderWidth + "px solid " + theme.baseLow,
            transition: "all .25s"
        };
        var inlineStyles = {
            root: theme.prefixStyle(__assign(__assign({}, rootWrapperStyle), style)),
            input: theme.prefixStyle(__assign({ display: "block", paddingLeft: rightNode ? 8 : void 0, paddingRight: leftNode ? 8 : void 0, width: "100%", height: "100%", background: "none", border: "none", outline: "none", color: "inherit", transition: "all .25s", margin: 0, "&::placeholder": {
                    color: theme.baseMediumHigh
                } }, textBoxStyle))
        };
        var styles = theme.prepareStyles({
            className: "text-box",
            styles: inlineStyles
        });
        var normalRender = (React.createElement("input", __assign({ ref: function (inputElm) {
                _this.inputElm = inputElm;
                if (!haveChild)
                    _this.rootElm = inputElm;
            } }, attributes, { style: styles.input.style, className: theme.classNames(className, styles.input.className), onChange: function (e) {
                onChangeValue(e.currentTarget.value);
                onChange(e);
            }, onFocus: this.handleFocus, onBlur: this.handleBlur }, (haveChild ? void 0 : hoverProps))));
        return (React.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, attributes, hoverProps, styles.root, { onClick: this.handleClick }),
            leftNode,
            normalRender,
            children,
            rightNode,
            !focused && React.createElement(RevealEffect_1.default, null)));
    };
    TextBox.defaultProps = {
        background: "none",
        textBoxStyle: {
            fontSize: "inherit",
            outline: "none",
            transition: "all .25s"
        },
        onFocus: emptyFunc,
        onBlur: emptyFunc,
        onChange: emptyFunc,
        onChangeValue: emptyFunc
    };
    TextBox.contextTypes = { theme: PropTypes.object };
    return TextBox;
}(React.Component));
exports.TextBox = TextBox;
exports.default = TextBox;
//# sourceMappingURL=index.js.map