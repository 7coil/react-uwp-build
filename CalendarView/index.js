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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarView = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var dateUtils = require("../utils/date.utils");
var DayPicker_1 = require("./DayPicker");
var Icon_1 = require("../Icon");
var MonthPicker_1 = require("./MonthPicker");
var YearPicker_1 = require("./YearPicker");
var FadeInOut_1 = require("./FadeInOut");
var ScaleInOut_1 = require("./ScaleInOut");
var emptyFunc = function () { };
var CalendarView = /** @class */ (function (_super) {
    __extends(CalendarView, _super);
    function CalendarView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            viewDate: new Date(),
            direction: "bottom",
            chooseISODates: [],
            currPickerMode: _this.props.pickerMode
        };
        _this.nextAction = function () {
            var _a = _this.state, viewDate = _a.viewDate, currPickerMode = _a.currPickerMode;
            switch (currPickerMode) {
                case "day": {
                    _this.setState({
                        viewDate: dateUtils.addMonths(viewDate, 1),
                        direction: "bottom"
                    });
                    break;
                }
                case "month": {
                    _this.setState({
                        viewDate: dateUtils.addYears(viewDate, 1),
                        direction: "bottom"
                    });
                    break;
                }
                case "year": {
                    _this.setState({
                        viewDate: dateUtils.addYears(viewDate, 10),
                        direction: "bottom"
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        };
        _this.prevAction = function () {
            var _a = _this.state, viewDate = _a.viewDate, currPickerMode = _a.currPickerMode;
            switch (currPickerMode) {
                case "day": {
                    _this.setState({
                        viewDate: dateUtils.addMonths(viewDate, -1),
                        direction: "top"
                    });
                    break;
                }
                case "month": {
                    _this.setState({
                        viewDate: dateUtils.addYears(viewDate, -1),
                        direction: "top"
                    });
                    break;
                }
                case "year": {
                    _this.setState({
                        viewDate: dateUtils.addYears(viewDate, -10),
                        direction: "top"
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        };
        _this.handleChooseDay = function (date) {
            var _a = _this.state, chooseISODates = _a.chooseISODates, viewDate = _a.viewDate;
            var selectSingleDay = _this.props.selectSingleDay;
            var dateISOString = date.toISOString();
            var index = chooseISODates.indexOf(dateISOString);
            index > -1 ? chooseISODates.splice(index, 1) : (chooseISODates = selectSingleDay ? [dateISOString] : __spread(chooseISODates, [dateISOString]));
            if (viewDate.getMonth() === date.getMonth()) {
                _this.setState({ chooseISODates: chooseISODates });
            }
            else {
                _this.setState({ chooseISODates: chooseISODates, viewDate: date });
            }
            _this.props.onChangeDate(date);
        };
        _this.onChooseMonth = function (month) {
            var viewDate = _this.state.viewDate;
            var newDate = new Date(viewDate.getFullYear(), month, viewDate.getDate());
            _this.setState({
                viewDate: new Date(viewDate.getFullYear(), month, viewDate.getDate()),
                currPickerMode: "day"
            });
            _this.props.onChangeDate(newDate);
        };
        _this.onChooseYear = function (year) {
            var viewDate = _this.state.viewDate;
            var newDate = new Date(year, viewDate.getMonth(), viewDate.getDate());
            _this.setState({
                viewDate: newDate,
                currPickerMode: "month"
            });
            _this.props.onChangeDate(newDate);
        };
        _this.getTitle = function () {
            var _a = _this.state, viewDate = _a.viewDate, currPickerMode = _a.currPickerMode;
            switch (currPickerMode) {
                case "day": {
                    return dateUtils.monthList[viewDate.getMonth()] + " " + viewDate.getFullYear();
                }
                case "month": {
                    var year = viewDate.getFullYear();
                    return year + " Year";
                }
                case "year": {
                    var year = viewDate.getFullYear();
                    var minYearOfTen = Math.floor(year / 10) * 10;
                    var maxYearOfTen = Math.ceil(year / 10) * 10;
                    return minYearOfTen + "-" + maxYearOfTen;
                }
                default: {
                    break;
                }
            }
        };
        _this.togglePickerMode = function (e) {
            if (typeof e === "string") {
                _this.setState({ currPickerMode: e });
            }
            switch (_this.state.currPickerMode) {
                case "day": {
                    _this.setState({ currPickerMode: "month" });
                    break;
                }
                case "month": {
                    _this.setState({ currPickerMode: "year" });
                    break;
                }
                case "year": {
                    break;
                }
                default: {
                    break;
                }
            }
        };
        return _this;
    }
    CalendarView.prototype.render = function () {
        var _a = this.props, defaultDate = _a.defaultDate, pickerMode = _a.pickerMode, onChangeDate = _a.onChangeDate, selectSingleDay = _a.selectSingleDay, background = _a.background, className = _a.className, attributes = __rest(_a, ["defaultDate", "pickerMode", "onChangeDate", "selectSingleDay", "background", "className"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "calendar-view",
            styles: inlineStyles
        });
        var _b = this.state, viewDate = _b.viewDate, direction = _b.direction, chooseISODates = _b.chooseISODates, currPickerMode = _b.currPickerMode;
        var title = this.getTitle();
        return (React.createElement("div", __assign({}, attributes, { style: styles.root.style, className: theme.classNames(styles.root.className, className) }),
            React.createElement("div", __assign({}, styles.title),
                React.createElement(FadeInOut_1.default, { appearAnimate: false, speed: 250, direction: direction, style: {
                        overflow: "hidden",
                        height: 24
                    }, childAttributes: {
                        style: theme.prefixStyle({
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        })
                    } },
                    React.createElement("p", { style: { cursor: "pointer", height: "100%" }, onClick: this.togglePickerMode, key: title }, title)),
                React.createElement("div", { style: theme.prefixStyle({ display: "flex", flexDirection: "row" }) },
                    React.createElement(Icon_1.default, __assign({}, styles.titleIcon, { onClick: this.prevAction, hoverStyle: { color: theme.baseMedium } }), "ChevronUp"),
                    React.createElement(Icon_1.default, __assign({}, styles.titleIcon, { onClick: this.nextAction, hoverStyle: { color: theme.baseMedium } }), "ChevronDown"))),
            React.createElement(ScaleInOut_1.default, __assign({ appearAnimate: false }, styles.body, { mode: "both", minScale: 0.4, speed: 250 }), currPickerMode === "day" ? (React.createElement(DayPicker_1.default, { date: viewDate, direction: direction, onChooseDay: this.handleChooseDay, chooseISODates: chooseISODates, key: currPickerMode })) : (currPickerMode === "month" ? (React.createElement(MonthPicker_1.default, { date: viewDate, direction: direction, key: currPickerMode, onChooseMonth: this.onChooseMonth })) : (React.createElement(YearPicker_1.default, { date: viewDate, direction: direction, key: currPickerMode, onChooseYear: this.onChooseYear }))))));
    };
    CalendarView.defaultProps = {
        defaultDate: new Date(),
        pickerMode: "day",
        onChangeDate: emptyFunc,
        selectSingleDay: true
    };
    CalendarView.contextTypes = { theme: PropTypes.object };
    return CalendarView;
}(React.Component));
exports.CalendarView = CalendarView;
function getStyles(calendarView) {
    var context = calendarView.context, _a = calendarView.props, style = _a.style, background = _a.background;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign(__assign(__assign({}, theme.acrylicTexture80.style), { display: "inline-block", verticalAlign: "middle", fontSize: 14, color: theme.baseHigh, width: 296, border: theme.borderWidth + "px solid " + theme.baseLow }), style)),
        title: prefixStyle({
            fontSize: 14,
            height: 42,
            padding: "0 16px",
            fontWeight: "lighter",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }),
        titleIcon: {
            fontSize: 16,
            paddingLeft: 8,
            cursor: "pointer"
        },
        body: prefixStyle({
            width: 296,
            height: 292
        })
    };
}
exports.default = CalendarView;
//# sourceMappingURL=index.js.map