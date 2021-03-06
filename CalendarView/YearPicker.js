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
var YearPicker = /** @class */ (function (_super) {
    __extends(YearPicker, _super);
    function YearPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseEnter = function (e, isNow) {
            var theme = _this.context.theme;
            e.currentTarget.style.border = theme.borderWidth + "px solid " + (isNow ? theme.baseHigh : theme.baseLow);
        };
        _this.handleMouseLeave = function (e, isNow) {
            var theme = _this.context.theme;
            e.currentTarget.style.border = theme.borderWidth + "px solid transparent";
        };
        _this.getYearsArray = function () {
            var date = _this.props.date;
            var year = date.getFullYear();
            var minYearOfTen = Math.floor(year / 10) * 10;
            var years = [];
            for (var i = 0; i < 16; i++) {
                years[i] = minYearOfTen + i;
            }
            return years;
        };
        return _this;
    }
    YearPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, date = _a.date, maxYear = _a.maxYear, minYear = _a.minYear, direction = _a.direction, onChooseYear = _a.onChooseYear, attributes = __rest(_a, ["date", "maxYear", "minYear", "direction", "onChooseYear"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "calendar-view-year",
            styles: inlineStyles
        });
        var years = this.getYearsArray();
        return (React.createElement(SlideInOut_1.default, __assign({}, attributes, { style: inlineStyles.root, mode: "both", speed: 350, direction: direction, appearAnimate: false }),
            React.createElement("div", { key: date.getFullYear() + ", " + date.getMonth() + " " + date.getDate() }, years.map(function (year, index) {
                var isNow = year === (new Date()).getFullYear();
                return React.createElement("button", { onMouseEnter: function (e) { return _this.handleMouseEnter(e, isNow); }, onMouseLeave: function (e) { return _this.handleMouseLeave(e, isNow); }, style: __assign(__assign({}, styles.yearItem.style), { position: "relative", background: isNow ? theme.accent : theme.useFluentDesign ? theme.altLow : theme.altHigh, border: theme.borderWidth + "px solid transparent" }), className: styles.yearItem.className, onClick: function () { return onChooseYear(year); }, key: "" + index },
                    year,
                    React.createElement(RevealEffect_1.default, { observerTransition: "transform", hoverSize: 80 }));
            }))));
    };
    YearPicker.defaultProps = {
        date: new Date(),
        maxYear: 2117,
        minYear: 1920,
        direction: "bottom",
        onChooseYear: function () { }
    };
    YearPicker.contextTypes = { theme: PropTypes.object };
    return YearPicker;
}(React.Component));
exports.default = YearPicker;
function getStyles(YearPicker) {
    var theme = YearPicker.context.theme, style = YearPicker.props.style;
    var prefixStyle = theme.prefixStyle;
    var fullHeight = 296 - theme.borderWidth * 2;
    return {
        root: prefixStyle(__assign({ width: 296, height: fullHeight, display: "flex", flexDirection: "row", flexWrap: "wrap" }, style)),
        yearItem: {
            transition: "all .25s ease-in-out",
            background: "none",
            outline: "none",
            color: theme.baseHigh,
            border: "none",
            width: fullHeight / 4,
            height: fullHeight / 4
        }
    };
}
//# sourceMappingURL=YearPicker.js.map