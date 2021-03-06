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
var React = require("react");
var PropTypes = require("prop-types");
var SlideInOut_1 = require("./SlideInOut");
var RevealEffect_1 = require("../RevealEffect");
var MonthPicker = /** @class */ (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseEnter = function (e, isNow) {
            var theme = _this.context.theme;
            e.currentTarget.style.border = theme.borderWidth + "px solid " + (isNow ? theme.baseHigh : theme.baseLow);
        };
        _this.handleMouseLeave = function (e, isNow) {
            var theme = _this.context.theme;
            e.currentTarget.style.border = theme.borderWidth + "px solid transparent";
        };
        _this.getMonthsArray = function () {
            var months = [];
            for (var i = 0; i < 16; i++) {
                months[i] = i < 12 ? i + 1 : i % 12 + 1;
            }
            return months;
        };
        return _this;
    }
    MonthPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, date = _a.date, direction = _a.direction, onChooseMonth = _a.onChooseMonth, attributes = __rest(_a, ["date", "direction", "onChooseMonth"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "calendar-view-month",
            styles: inlineStyles
        });
        var months = this.getMonthsArray();
        return (React.createElement(SlideInOut_1.default, __assign({}, attributes, { style: inlineStyles.root, mode: "both", speed: 350, direction: direction, appearAnimate: false }),
            React.createElement("div", { key: date.getFullYear() + ", " + date.getMonth() + " " + date.getDate() }, months.map(function (month, index) {
                var isCurrYear = index < 12;
                var isNow = isCurrYear &&
                    date.getFullYear() === (new Date()).getFullYear() &&
                    month === (new Date()).getMonth() + 1;
                return React.createElement("button", { onMouseEnter: function (e) { return _this.handleMouseEnter(e, isNow); }, onMouseLeave: function (e) { return _this.handleMouseLeave(e, isNow); }, style: __assign(__assign({}, styles.monthItem.style), { position: "relative", background: isNow ? theme.accent : (theme.useFluentDesign ? (isCurrYear ? theme.altLow : theme.listLow) : (isCurrYear ? theme.altHigh : theme.chromeLow)), border: theme.borderWidth + "px solid transparent" }), className: styles.monthItem.className, onClick: function () { return onChooseMonth(index); }, key: "" + index }, "" + month,
                    React.createElement(RevealEffect_1.default, { observerTransition: "transform", hoverSize: 80 }));
            }))));
    };
    MonthPicker.defaultProps = {
        date: new Date(),
        direction: "bottom",
        onChooseMonth: function () { }
    };
    MonthPicker.contextTypes = { theme: PropTypes.object };
    return MonthPicker;
}(React.Component));
exports.default = MonthPicker;
function getStyles(monthPicker) {
    var theme = monthPicker.context.theme, style = monthPicker.props.style;
    var prefixStyle = theme.prefixStyle;
    var fullHeight = 296 - theme.borderWidth * 2;
    return {
        root: prefixStyle(__assign({ width: 296, height: fullHeight, display: "flex", flexDirection: "row", flexWrap: "wrap" }, style)),
        monthItem: {
            transition: "all .25s 0s ease-in-out",
            background: "none",
            outline: "none",
            color: theme.baseHigh,
            border: "none",
            width: fullHeight / 4,
            height: fullHeight / 4
        }
    };
}
//# sourceMappingURL=MonthPicker.js.map