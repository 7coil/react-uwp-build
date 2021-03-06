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
exports.CheckBox = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Icon_1 = require("../Icon");
var PseudoClasses_1 = require("../PseudoClasses");
var emptyFunc = function () { };
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            checked: _this.props.defaultChecked
        };
        /**
         * `Public` Toggle Checked Method.
         */
        _this.toggleChecked = function (e) {
            var checked;
            _this.setState(function (prevState, prevProps) {
                checked = !prevState.checked;
                return { checked: checked };
            }, function () { return _this.props.onCheck(checked); });
        };
        _this.handleClick = function (e) {
            var _a = _this.props, disabled = _a.disabled, onClick = _a.onClick;
            if (!disabled)
                _this.toggleChecked(e);
            onClick(e);
        };
        return _this;
    }
    CheckBox.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(function (prevState, prevProps) { return ({
            checked: nextProps.defaultChecked
        }); });
    };
    CheckBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, defaultChecked = _a.defaultChecked, onCheck = _a.onCheck, label = _a.label, labelPosition = _a.labelPosition, disabled = _a.disabled, background = _a.background, style = _a.style, attributes = __rest(_a, ["defaultChecked", "onCheck", "label", "labelPosition", "disabled", "background", "style"]);
        var checked = this.state.checked;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "checkbox",
            styles: inlineStyles
        });
        var haveLabel = label !== void 0;
        var checkbox = (React.createElement(PseudoClasses_1.default, __assign({}, styles.iconParent, { disabled: disabled }),
            React.createElement("div", { ref: function (rootElm) { return _this.rootElm = rootElm; } },
                React.createElement(Icon_1.default, { style: inlineStyles.icon }, "CheckMarkZeroWidthLegacy"))));
        return (React.createElement("div", __assign({}, attributes, { onClick: this.handleClick }, styles.wrapper), haveLabel ? (React.createElement("div", __assign({}, styles.root),
            checkbox,
            label !== void 0 && (React.createElement("span", __assign({}, styles.label), label)))) : checkbox));
    };
    CheckBox.defaultProps = {
        defaultChecked: null,
        onCheck: emptyFunc,
        onClick: emptyFunc,
        size: 20,
        labelPosition: "right",
        label: void 0
    };
    CheckBox.contextTypes = { theme: PropTypes.object };
    return CheckBox;
}(React.Component));
exports.CheckBox = CheckBox;
function getStyles(checkBox) {
    var _a;
    var context = checkBox.context, _b = checkBox.props, style = _b.style, size = _b.size, disabled = _b.disabled, labelPosition = _b.labelPosition, background = _b.background, checked = checkBox.state.checked;
    var theme = context.theme;
    var checkedIsNull = checked === null;
    var iconParentBase = theme.prefixStyle({
        transition: "all .25s",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.altHigh,
        border: theme.borderWidth + "px solid " + theme.baseMediumHigh,
        width: size + "px",
        height: size + "px",
        background: background || "none",
        cursor: "default",
        overflow: "hidden"
    });
    var iconParentHover = { border: theme.borderWidth + "px solid " + theme.baseHigh };
    var iconParent;
    switch (checked) {
        case true: {
            iconParent = __assign(__assign({}, iconParentBase), { border: disabled ? theme.borderWidth + "px solid " + theme.baseLow : theme.borderWidth + "px solid " + theme.accent, "&:hover": disabled ? void 0 : iconParentHover, "&:disabled": {
                    border: theme.borderWidth + "px solid " + theme.baseLow
                } });
            break;
        }
        case false: {
            iconParent = __assign(__assign({}, iconParentBase), { border: disabled ? theme.borderWidth + "px solid " + theme.baseLow : theme.borderWidth + "px solid " + theme.baseMediumHigh, "&:hover": disabled ? void 0 : iconParentHover, "&:disabled": {
                    border: theme.borderWidth + "px solid " + theme.baseLow
                } });
            break;
        }
        case null: {
            iconParent = __assign(__assign({}, iconParentBase), { border: disabled ? theme.borderWidth + "px solid " + theme.baseLow : theme.borderWidth + "px solid " + theme.baseMediumHigh, "&:hover": disabled ? void 0 : iconParentHover, "&:disabled": {
                    border: theme.borderWidth + "px solid " + theme.baseLow
                } });
            break;
        }
        default: {
            break;
        }
    }
    var leftLabelPosition = labelPosition === "left";
    return {
        wrapper: theme.prefixStyle(__assign({ position: "relative", display: "inline-block", verticalAlign: "middle" }, style)),
        root: theme.prefixStyle({
            display: "flex",
            flex: "0 0 auto",
            justifyContent: leftLabelPosition ? "flex-end" : "flex-start",
            flexDirection: leftLabelPosition ? "row-reverse" : "row",
            alignItems: "center"
        }),
        iconParent: iconParent,
        icon: theme.prefixStyle({
            transition: "all .25s",
            color: disabled ? (checkedIsNull ? "transparent" : theme.baseLow) : (checkedIsNull ? theme.accent : "#fff"),
            flex: "0 0 auto",
            padding: 0,
            margin: 0,
            width: size,
            height: size,
            fontSize: 18,
            transform: checked ? "scale(1)" : (checkedIsNull ? "scale(0.6125)" : "scale(0)"),
            background: disabled ? (checkedIsNull ? theme.baseLow : void 0) : theme.accent
        }),
        label: theme.prefixStyle((_a = {
                color: disabled ? theme.baseLow : theme.baseMediumHigh
            },
            _a["margin" + (leftLabelPosition ? "Right" : "Left")] = 8,
            _a))
    };
}
exports.default = CheckBox;
//# sourceMappingURL=index.js.map