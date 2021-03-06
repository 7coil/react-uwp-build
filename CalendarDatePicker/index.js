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
exports.CalendarDatePicker = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var Icon_1 = require("../Icon");
var TextBox_1 = require("../TextBox");
var CalendarView_1 = require("../CalendarView");
var emptyFunc = function () { };
var CalendarDatePicker = /** @class */ (function (_super) {
    __extends(CalendarDatePicker, _super);
    function CalendarDatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currDate: _this.props.defaultDate,
            isInit: true
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            _this.addBlurEvent.setConfig({
                addListener: _this.state.showCalendarView,
                clickExcludeElm: _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        showCalendarView: false
                    });
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        _this.toggleShowCalendarView = function (showCalendarView) {
            if (!_this.textBox.rootElm.contains(showCalendarView.target))
                return;
            _this.props.onClick(showCalendarView);
            if (typeof showCalendarView === "boolean") {
                if (showCalendarView !== _this.state.showCalendarView) {
                    _this.setState({ showCalendarView: showCalendarView });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    showCalendarView: !prevState.showCalendarView
                }); });
            }
        };
        _this.handleChangeDate = function (date) {
            _this.state.currDate = date;
            _this.state.isInit = false;
            _this.props.onChangeDate(date);
        };
        return _this;
    }
    CalendarDatePicker.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    CalendarDatePicker.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    CalendarDatePicker.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    CalendarDatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, defaultDate = _a.defaultDate, placeholder = _a.placeholder, onChangeDate = _a.onChangeDate, attributes = __rest(_a, ["defaultDate", "placeholder", "onChangeDate"]);
        var _b = this.state, currDate = _b.currDate, isInit = _b.isInit, showCalendarView = _b.showCalendarView;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            styles: inlineStyles,
            className: "calendar-picker"
        });
        var day = currDate.getDate();
        var month = currDate.getMonth() + 1;
        if (day < 10)
            day = "0" + day;
        if (month < 10)
            month = "0" + month;
        var mmddyy = [month, day, currDate.getFullYear()].join("/");
        return (React.createElement("div", __assign({}, styles.root, { onClick: this.toggleShowCalendarView, ref: function (rootElm) { return _this.rootElm = rootElm; } }),
            React.createElement(TextBox_1.default, __assign({}, attributes, { ref: function (textBox) { return _this.textBox = textBox; }, style: inlineStyles.input, placeholder: isInit ? placeholder : mmddyy, disabled: true, rightNode: React.createElement(Icon_1.default, { style: inlineStyles.icon }, "Calendar") })),
            React.createElement(CalendarView_1.default, { style: inlineStyles.calendarView, defaultDate: defaultDate, onChangeDate: this.handleChangeDate })));
    };
    CalendarDatePicker.defaultProps = {
        defaultDate: new Date(),
        placeholder: "mm/dd/yyyy",
        width: 296,
        height: 32,
        onClick: emptyFunc,
        onChangeDate: emptyFunc
    };
    CalendarDatePicker.contextTypes = { theme: PropTypes.object };
    return CalendarDatePicker;
}(React.Component));
exports.CalendarDatePicker = CalendarDatePicker;
function getStyles(calendarDatePicker) {
    var context = calendarDatePicker.context, _a = calendarDatePicker.props, width = _a.width, height = _a.height, style = _a.style, showCalendarView = calendarDatePicker.state.showCalendarView;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ display: "inline-block", verticalAlign: "middle", position: "relative" }, style)),
        input: {
            width: width,
            height: height
        },
        icon: {
            margin: "0 8px",
            cursor: "pointer",
            color: theme.baseHigh
        },
        calendarView: {
            position: "absolute",
            top: height,
            left: 0,
            transform: "translate3d(0, " + (showCalendarView ? "4px" : (typeof height === "number" ? "-" + height + "px" : "-" + height)) + ", 0)",
            zIndex: showCalendarView ? theme.zIndex.flyout : void 0,
            opacity: showCalendarView ? 1 : 0,
            pointerEvents: showCalendarView ? "all" : "none",
            transition: "all .25s ease"
        }
    };
}
exports.default = CalendarDatePicker;
//# sourceMappingURL=index.js.map