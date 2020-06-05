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
exports.RadioButton = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var rootStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    cursor: "default"
};
var emptyFunc = function () { };
var RadioButton = /** @class */ (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currChecked: _this.props.defaultChecked
        };
        _this.handleClick = function (e) {
            var currChecked = _this.state.currChecked;
            if (!currChecked) {
                _this.setState({ currChecked: true });
            }
            _this.props.onCheck(true);
        };
        _this.handleMouseEnter = function (e) {
            _this.setState({ hovered: true });
        };
        _this.handleMouseLeave = function (e) {
            _this.setState({ hovered: false });
        };
        return _this;
    }
    RadioButton.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            currChecked: nextProps.defaultChecked
        });
    };
    RadioButton.prototype.render = function () {
        var _this = this;
        var _a = this.props, defaultChecked = _a.defaultChecked, onCheck = _a.onCheck, style = _a.style, size = _a.size, disabled = _a.disabled, label = _a.label, className = _a.className, radioStyle = _a.radioStyle, radioCheckedStyle = _a.radioCheckedStyle, radioDotStyle = _a.radioDotStyle, radioDotCheckedStyle = _a.radioDotCheckedStyle, attributes = __rest(_a, ["defaultChecked", "onCheck", "style", "size", "disabled", "label", "className", "radioStyle", "radioCheckedStyle", "radioDotStyle", "radioDotCheckedStyle"]);
        var _b = this.state, currChecked = _b.currChecked, hovered = _b.hovered;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "radio-button",
            styles: inlineStyles
        });
        var normalRender = (React.createElement("div", __assign({ onClick: disabled ? void 0 : this.handleClick, onMouseEnter: disabled ? void 0 : this.handleMouseEnter, onMouseLeave: disabled ? void 0 : this.handleMouseLeave }, styles.radioShape),
            React.createElement("div", __assign({}, styles.radioDot))));
        return (React.createElement("div", __assign({ ref: (function (rootElm) { return _this.rootElm = rootElm; }) }, attributes, { style: styles.root.style, className: theme.classNames(styles.root.className, className) }), label ? (React.createElement("div", __assign({}, styles.label),
            normalRender,
            React.createElement("span", __assign({}, styles.labelText), label))) : normalRender));
    };
    RadioButton.defaultProps = {
        size: 24,
        onCheck: emptyFunc
    };
    RadioButton.contextTypes = { theme: PropTypes.object };
    return RadioButton;
}(React.Component));
exports.RadioButton = RadioButton;
function getStyles(radioButton) {
    var _a = radioButton.props, style = _a.style, size = _a.size, disabled = _a.disabled, radioStyle = _a.radioStyle, radioCheckedStyle = _a.radioCheckedStyle, radioDotStyle = _a.radioDotStyle, radioDotCheckedStyle = _a.radioDotCheckedStyle, _b = radioButton.state, currChecked = _b.currChecked, hovered = _b.hovered, theme = radioButton.context.theme;
    var dotSize = size / 2.5;
    return {
        root: style ? theme.prefixStyle(__assign(__assign({}, rootStyle), style)) : rootStyle,
        radioShape: theme.prefixStyle(__assign(__assign({ position: "relative", flex: "0 0 auto", display: "inline-block", borderRadius: size, color: theme.altHigh, border: disabled ? size / 12 + "px solid " + theme.baseLow : size / 12 + "px solid " + (currChecked ? theme.accent : (hovered ? theme.baseHigh : theme.baseMediumHigh)), width: size, height: size, overflow: "hidden", transition: "all .25s ease-in-out" }, radioStyle), (currChecked ? radioCheckedStyle : void 0))),
        radioDot: theme.prefixStyle(__assign(__assign({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: "auto", background: disabled ? theme.baseLow : (hovered ? theme.baseHigh : theme.baseMediumHigh), transition: "all .25s", borderRadius: dotSize, width: dotSize, height: dotSize, transform: "scale(" + (currChecked ? 1 : 0) + ")" }, radioDotStyle), (currChecked ? radioDotCheckedStyle : void 0))),
        label: theme.prefixStyle({
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        }),
        labelText: {
            fontSize: size / 2,
            lineHeight: size + "px",
            color: disabled ? theme.baseLow : theme.baseMediumHigh,
            marginLeft: size / 4,
            cursor: "text"
        }
    };
}
exports.default = RadioButton;
//# sourceMappingURL=index.js.map