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
exports.DatePicker = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var Separator_1 = require("../Separator");
var IconButton_1 = require("../IconButton");
var PseudoClasses_1 = require("../PseudoClasses");
var ListView_1 = require("../ListView");
var scrollToYEasing_1 = require("../utils/browser/scrollToYEasing");
var date_utils_1 = require("../utils/date.utils");
var RevealEffect_1 = require("../RevealEffect");
var emptyFunc = function () { };
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showPicker: false,
            currDate: _this.props.defaultDate
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.rootElm = null;
        _this.prevDate = _this.props.defaultDate;
        _this.monthIndex = 0;
        _this.dateIndex = 0;
        _this.yearIndex = 0;
        _this.addBlurEventMethod = function () {
            var pickerItemHeight = _this.props.pickerItemHeight;
            scrollToYEasing_1.default(_this.monthListView.rootElm, _this.monthIndex * pickerItemHeight, 0.1);
            scrollToYEasing_1.default(_this.dateListView.rootElm, _this.dateIndex * pickerItemHeight, 0.1);
            scrollToYEasing_1.default(_this.yearListView.rootElm, _this.yearIndex * pickerItemHeight, 0.1);
            _this.addBlurEvent.setConfig({
                addListener: _this.state.showPicker,
                clickExcludeElm: _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        showPicker: false
                    });
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        _this.toggleShowPicker = function (showPicker) {
            var currDate = _this.state.currDate;
            if (typeof showPicker === "boolean") {
                if (showPicker !== _this.state.showPicker) {
                    _this.setState({ showPicker: showPicker });
                    if (showPicker) {
                        _this.prevDate = currDate;
                    }
                }
            }
            else {
                _this.setState(function (prevState, prevProps) {
                    var showPicker = !prevState.showPicker;
                    if (showPicker) {
                        _this.prevDate = currDate;
                    }
                    return { showPicker: showPicker };
                });
            }
        };
        _this.setDate = function (date, month, year) {
            var currDate = _this.state.currDate;
            var currDateNumb = date === void 0 ? currDate.getDate() : date;
            var currMonth = month === void 0 ? currDate.getMonth() : month;
            var currYear = year === void 0 ? currDate.getFullYear() : year;
            _this.setState({ currDate: new Date(currYear, currMonth, currDateNumb) });
        };
        return _this;
    }
    DatePicker.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.defaultDate !== this.state.currDate) {
            this.setState({ currDate: nextProps.defaultDate });
        }
    };
    DatePicker.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    DatePicker.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    DatePicker.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, onChangeDate = _a.onChangeDate, defaultDate = _a.defaultDate, maxYear = _a.maxYear, minYear = _a.minYear, inputItemHeight = _a.inputItemHeight, pickerItemHeight = _a.pickerItemHeight, background = _a.background, className = _a.className, attributes = __rest(_a, ["onChangeDate", "defaultDate", "maxYear", "minYear", "inputItemHeight", "pickerItemHeight", "background", "className"]);
        var _b = this.state, currDate = _b.currDate, showPicker = _b.showPicker;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "date-picker",
            styles: inlineStyles
        });
        var separator = React.createElement(Separator_1.default, { direction: "column", style: { margin: 0 } });
        var currYear = currDate.getFullYear();
        var currMonth = currDate.getMonth();
        var currDateNumb = currDate.getDate();
        var monthArray = date_utils_1.monthList;
        var dateArray = Array(date_utils_1.getLastDayOfMonth(currDate).getDate()).fill(0).map(function (numb, index) { return index + 1; });
        var yearArray = Array(maxYear - minYear).fill(0).map(function (numb, index) { return minYear + index; });
        this.monthIndex = currMonth;
        this.dateIndex = dateArray.indexOf(currDateNumb);
        this.yearIndex = yearArray.indexOf(currYear);
        return (React.createElement(PseudoClasses_1.default, __assign({}, attributes, styles.root),
            React.createElement("div", __assign({}, attributes, { style: styles.root.style, className: theme.classNames(styles.root.className, className), ref: function (rootElm) { return _this.rootElm = rootElm; } }),
                React.createElement("div", __assign({}, styles.pickerModal),
                    React.createElement("div", __assign({}, styles.listViews),
                        React.createElement(ListView_1.default, { ref: function (monthListView) { return _this.monthListView = monthListView; }, style: inlineStyles.listView, listItemStyle: inlineStyles.listItem, defaultFocusListIndex: currMonth, listSource: monthArray, onChooseItem: function (month) {
                                _this.setDate(void 0, month, void 0);
                            } }),
                        React.createElement(ListView_1.default, { ref: function (dateListView) { return _this.dateListView = dateListView; }, style: inlineStyles.listView, listItemStyle: inlineStyles.listItem, defaultFocusListIndex: this.dateIndex, listSource: dateArray, onChooseItem: function (dayIndex) {
                                _this.setDate(dayIndex + 1, void 0, void 0);
                            } }),
                        React.createElement(ListView_1.default, { ref: function (yearListView) { return _this.yearListView = yearListView; }, style: inlineStyles.listView, listItemStyle: inlineStyles.listItem, defaultFocusListIndex: this.yearIndex, listSource: yearArray, onChooseItem: function (yearIndex) {
                                _this.setDate(void 0, void 0, minYear + yearIndex);
                            } })),
                    React.createElement("div", __assign({}, styles.iconButtonGroup),
                        React.createElement(IconButton_1.default, { style: inlineStyles.iconButton, size: pickerItemHeight, onClick: function () {
                                onChangeDate(currDate);
                                _this.setState({ showPicker: false });
                            } },
                            "AcceptLegacy",
                            React.createElement(RevealEffect_1.default, null)),
                        React.createElement(IconButton_1.default, { style: inlineStyles.iconButton, size: pickerItemHeight, onClick: function () {
                                _this.setState({ currDate: _this.prevDate, showPicker: false });
                            } },
                            "ClearLegacy",
                            React.createElement(RevealEffect_1.default, null)))),
                React.createElement("span", __assign({}, styles.button, { onClick: this.toggleShowPicker }), date_utils_1.monthList[currMonth]),
                separator,
                React.createElement("span", __assign({}, styles.button, { onClick: this.toggleShowPicker }), currDateNumb),
                separator,
                React.createElement("span", __assign({}, styles.button, { onClick: this.toggleShowPicker }), currYear),
                React.createElement(RevealEffect_1.default, null))));
    };
    DatePicker.defaultProps = {
        inputItemHeight: 28,
        pickerItemHeight: 44,
        onChangeDate: emptyFunc,
        defaultDate: new Date(),
        maxYear: new Date().getFullYear() + 50,
        minYear: new Date().getFullYear() - 50
    };
    DatePicker.contextTypes = { theme: PropTypes.object };
    return DatePicker;
}(React.Component));
exports.DatePicker = DatePicker;
function getStyles(datePicker) {
    var theme = datePicker.context.theme, _a = datePicker.props, style = _a.style, inputItemHeight = _a.inputItemHeight, pickerItemHeight = _a.pickerItemHeight, showPicker = datePicker.state.showPicker;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ width: 320, flex: "0 0 auto", display: "flex", flexDirection: "row", alignItems: "center", verticalAlign: "middle", color: theme.baseMediumHigh, border: theme.borderWidth + "px solid " + theme.baseMediumLow, height: inputItemHeight, lineHeight: inputItemHeight + "px", position: "relative", transition: "all .25s ease-in-out", "&:hover": {
                border: theme.borderWidth + "px solid " + theme.baseMediumLow
            } }, style)),
        pickerModal: prefixStyle(__assign(__assign({}, theme.acrylicTexture60.style), { overflow: "hidden", flex: "0 0 auto", display: "flex", flexDirection: "column", position: "absolute", top: 0, left: -theme.borderWidth, width: "calc(100% + " + theme.borderWidth * 2 + "px)", opacity: showPicker ? 1 : 0, transform: "scaleY(" + (showPicker ? 1 : 0) + ") translateY(-50%)", transformOrigin: "top", pointerEvents: showPicker ? "all" : "none", zIndex: theme.zIndex.flyout, transition: "all .25s ease-in-out" })),
        listViews: prefixStyle({
            border: "1px solid " + theme.listLow,
            flex: "0 0 auto",
            width: "100%",
            height: pickerItemHeight * 7,
            display: "flex",
            flexDirection: "row"
        }),
        listView: prefixStyle({
            userSelect: "none",
            border: "none",
            borderLeft: "1px solid " + theme.listLow,
            width: "100%",
            height: pickerItemHeight * 7,
            padding: pickerItemHeight * 3 + "px 0",
            overflowY: "inherit",
            overflowX: "hidden",
            flex: "1 1 auto"
        }),
        listItem: {
            padding: "0 8px",
            height: pickerItemHeight,
            lineHeight: pickerItemHeight + "px",
            flex: "0 0 auto",
            fontSize: pickerItemHeight / 3
        },
        button: {
            flex: "1 1 auto",
            display: "inline-block",
            cursor: "default",
            verticalAlign: "top",
            height: inputItemHeight - 4,
            lineHeight: inputItemHeight - 4 + "px",
            padding: "0 " + (inputItemHeight - 4) + "px"
        },
        iconButtonGroup: {
            boxShadow: "inset 0 0 0 1px " + theme.baseLow,
            zIndex: theme.zIndex.flyout + 1
        },
        iconButton: {
            position: "relative",
            verticalAlign: "top",
            width: "50%",
            height: pickerItemHeight
        }
    };
}
exports.default = DatePicker;
//# sourceMappingURL=index.js.map