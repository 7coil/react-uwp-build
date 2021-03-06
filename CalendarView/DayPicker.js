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
var dateUtils = require("../utils/date.utils");
var SlideInOut_1 = require("./SlideInOut");
var RevealEffect_1 = require("../RevealEffect");
var DayPicker = /** @class */ (function (_super) {
    __extends(DayPicker, _super);
    function DayPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseEnter = function (e, date, isCurrMonth, isNow) {
            if (isNow)
                return;
            var theme = _this.context.theme;
            var chooseISODates = _this.props.chooseISODates;
            var isChoose = chooseISODates.includes(date.toISOString());
            e.currentTarget.style.background = isChoose ? theme.accent : (isCurrMonth ? (theme.useFluentDesign ? theme.altLow : theme.altHigh) : (theme.useFluentDesign ? theme.listLow : theme.chromeLow));
        };
        _this.handleMouseLeave = function (e, date, isCurrMonth, isNow) {
            if (isNow)
                return;
            var theme = _this.context.theme;
            var chooseISODates = _this.props.chooseISODates;
            var isChoose = chooseISODates.includes(date.toISOString());
            e.currentTarget.style.background = isChoose ? theme.accent : (isCurrMonth ? (theme.useFluentDesign ? theme.altLow : theme.altHigh) : (theme.useFluentDesign ? theme.listLow : theme.chromeLow));
        };
        _this.getDaysArray = function () {
            var date = _this.props.date;
            var currMonth = date.getMonth();
            var currYear = date.getFullYear();
            var daysArray = [];
            var prevMonthLast = dateUtils.getLastDayOfPrevMonth(date);
            var prevMonthLastDay = prevMonthLast.getDay();
            var prevMonthLastDate = prevMonthLast.getDate();
            var monthFirst = dateUtils.getFirstDayOfMonth(date);
            var monthFirstDate = monthFirst.getDate();
            var monthLastDate = dateUtils.getLastDayOfMonth(date).getDate();
            for (var i = 0; i < 42; i++) {
                daysArray[i] = {};
                var day = void 0;
                if (i < prevMonthLastDay) {
                    day = prevMonthLastDate - prevMonthLastDay + i + 1;
                    daysArray[i]["date"] = new Date(currYear, currMonth - 1, day);
                    daysArray[i]["isCurrMonth"] = false;
                }
                else if (i < monthLastDate + prevMonthLastDay) {
                    day = monthFirstDate - prevMonthLastDay + i;
                    daysArray[i]["date"] = new Date(currYear, currMonth, day);
                    daysArray[i]["isCurrMonth"] = true;
                }
                else {
                    day = i - prevMonthLastDay - monthLastDate + 1;
                    daysArray[i]["date"] = new Date(currYear, currMonth + 1, day);
                    daysArray[i]["isCurrMonth"] = false;
                }
                daysArray[i]["day"] = day;
            }
            return daysArray;
        };
        return _this;
    }
    DayPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, date = _a.date, onChooseDay = _a.onChooseDay, direction = _a.direction, chooseISODates = _a.chooseISODates, attributes = __rest(_a, ["date", "onChooseDay", "direction", "chooseISODates"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "calendar-view-day",
            styles: inlineStyles
        });
        var days = this.getDaysArray();
        return (React.createElement("div", __assign({}, styles.container),
            React.createElement("div", __assign({}, styles.weeklyHead), dateUtils.dayShortList.map(function (str, index) { return (React.createElement("button", __assign({}, styles.weeklyHeadItem, { key: "" + index }), str)); })),
            React.createElement(SlideInOut_1.default, __assign({}, attributes, { style: inlineStyles.root, mode: "both", speed: 350, direction: direction, appearAnimate: false }),
                React.createElement("div", { key: date.getFullYear() + ", " + date.getMonth() + " " + date.getDate() }, days.map(function (_a, index) {
                    var day = _a.day, isCurrMonth = _a.isCurrMonth, date = _a.date;
                    var dateISOString = date.toISOString();
                    var isChoose = chooseISODates.includes(dateISOString);
                    var nowDate = new Date();
                    var isNow = date.getFullYear() === nowDate.getFullYear() &&
                        date.getMonth() === nowDate.getMonth() &&
                        date.getDate() === nowDate.getDate();
                    return React.createElement("button", { onMouseEnter: function (e) { return _this.handleMouseEnter(e, date, isCurrMonth, isNow); }, onMouseLeave: function (e) { return _this.handleMouseLeave(e, date, isCurrMonth, isNow); }, style: __assign(__assign({}, styles.dayItem.style), { position: "relative", border: theme.borderWidth + "px solid " + theme.baseLow, color: isCurrMonth ? theme.baseHigh : theme.baseLow, background: (isNow || isChoose) ? (isNow ? theme.accent : theme.listAccentLow) : (isCurrMonth ? (theme.useFluentDesign ? theme.altLow : theme.altHigh) : (theme.useFluentDesign ? theme.listLow : theme.chromeLow)) }), className: styles.dayItem.className, onClick: function () { return onChooseDay(date); }, key: "" + index },
                        day,
                        React.createElement(RevealEffect_1.default, { observerTransition: "transform", hoverSize: 40 }));
                })))));
    };
    DayPicker.defaultProps = {
        date: new Date(),
        onChooseDay: function () { },
        chooseISODates: [],
        direction: "bottom"
    };
    DayPicker.contextTypes = { theme: PropTypes.object };
    return DayPicker;
}(React.Component));
exports.default = DayPicker;
function getStyles(dayPicker) {
    var theme = dayPicker.context.theme, style = dayPicker.props.style;
    var prefixStyle = theme.prefixStyle;
    var fullHeight = 296 - theme.borderWidth * 2;
    return {
        container: prefixStyle({
            height: fullHeight,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexGrow: 0
        }),
        root: prefixStyle(__assign({ width: 296, height: fullHeight / 7 * 6 - theme.borderWidth, display: "flex", flexDirection: "row", flexWrap: "wrap" }, style)),
        weeklyHead: prefixStyle({
            display: "flex",
            flexDirection: "row"
        }),
        weeklyHeadItem: {
            background: "none",
            border: "none",
            outline: "none",
            color: theme.baseHigh,
            width: fullHeight / 7,
            height: 40
        },
        dayItem: {
            transition: "all .25s 0s ease-in-out",
            border: "none",
            background: "none",
            outline: "none",
            color: theme.baseHigh,
            width: fullHeight / 7,
            height: fullHeight / 7
        }
    };
}
//# sourceMappingURL=DayPicker.js.map