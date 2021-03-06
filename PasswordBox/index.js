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
exports.PasswordBox = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var TextBox_1 = require("../TextBox");
var Icon_1 = require("../Icon");
var emptyFunc = function () { };
var PasswordBox = /** @class */ (function (_super) {
    __extends(PasswordBox, _super);
    function PasswordBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showPassword: _this.props.defaultShowPassword
        };
        _this.handleChange = function (e) {
            var event;
            event = e;
            _this.props.onChangeValue(event.currentTarget.value);
        };
        _this.getValue = function () { return _this.textBox.getValue(); };
        _this.setValue = function (value) { return _this.textBox.setValue(value); };
        _this.toggleShowPassword = function (showPassword) {
            if (typeof showPassword === "boolean") {
                if (showPassword !== _this.state.showPassword) {
                    _this.setState({ showPassword: showPassword });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) {
                    showPassword = !prevState.showPassword;
                    return { showPassword: showPassword };
                });
            }
        };
        return _this;
    }
    PasswordBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, onChangeValue = _a.onChangeValue, defaultShowPassword = _a.defaultShowPassword, passwordBoxHeight = _a.passwordBoxHeight, attributes = __rest(_a, ["onChangeValue", "defaultShowPassword", "passwordBoxHeight"]);
        var showPassword = this.state.showPassword;
        var theme = this.context.theme;
        var styles = getStyles(this);
        return (React.createElement(TextBox_1.default, __assign({}, attributes, { type: showPassword ? "text" : "password", ref: function (textBox) { return _this.textBox = textBox; }, style: styles.root, hoverStyle: {
                border: "2px solid " + theme.accent
            }, rightNode: React.createElement(Icon_1.default, { onClick: this.toggleShowPassword, style: theme.prefixStyle({
                    width: passwordBoxHeight,
                    height: passwordBoxHeight,
                    fontSize: passwordBoxHeight / 2,
                    lineHeight: passwordBoxHeight + "px",
                    cursor: "pointer",
                    background: "none",
                    color: theme.baseHigh,
                    flex: "0 0 auto",
                    transition: "all .25s"
                }), hoverStyle: {
                    color: "#fff",
                    background: theme.accent
                } }, "RevealPasswordLegacy"), onChange: this.handleChange })));
    };
    PasswordBox.defaultProps = {
        passwordBoxHeight: 32,
        defaultShowPassword: false,
        onChangeValue: emptyFunc
    };
    PasswordBox.contextTypes = { theme: PropTypes.object };
    return PasswordBox;
}(React.Component));
exports.PasswordBox = PasswordBox;
function getStyles(passwordBox) {
    var context = passwordBox.context, _a = passwordBox.props, style = _a.style, passwordBoxHeight = _a.passwordBoxHeight;
    var theme = context.theme;
    return {
        root: theme.prefixStyle(__assign(__assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "hidden", fontWeight: "lighter", fontSize: passwordBoxHeight / 2, padding: 0, paddingLeft: 8 }, style), { height: passwordBoxHeight }))
    };
}
exports.default = PasswordBox;
//# sourceMappingURL=index.js.map