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
exports.TimePicker = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var Separator_1 = require("../Separator");
var IconButton_1 = require("../IconButton");
var PseudoClasses_1 = require("../PseudoClasses");
var ListView_1 = require("../ListView");
var scrollToYEasing_1 = require("../utils/browser/scrollToYEasing");
var RevealEffect_1 = require("../RevealEffect");
var emptyFunc = function () { };
var TimePicker = /** @class */ (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showPicker: _this.props.defaultShowPicker,
            currHour: _this.props.defaultHour,
            currMinute: _this.props.defaultMinute
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.rootElm = null;
        _this.prevState = {
            currHour: _this.props.defaultHour,
            currMinute: _this.props.defaultMinute
        };
        _this.addBlurEventMethod = function () {
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
            if (typeof showPicker === "boolean") {
                if (showPicker !== _this.state.showPicker) {
                    _this.setState({ showPicker: showPicker });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) {
                    var showPicker = !prevState.showPicker;
                    return { showPicker: showPicker };
                });
            }
        };
        return _this;
    }
    TimePicker.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultHour = nextProps.defaultHour, defaultMinute = nextProps.defaultMinute, defaultShowPicker = nextProps.defaultShowPicker;
        var _a = this.state, currHour = _a.currHour, currMinute = _a.currMinute, showPicker = _a.showPicker;
        if (defaultHour !== currHour || defaultMinute !== currMinute || defaultShowPicker !== showPicker) {
            this.setState({ currHour: defaultHour, currMinute: defaultMinute, showPicker: defaultShowPicker });
        }
    };
    TimePicker.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    TimePicker.prototype.componentDidUpdate = function () {
        var pickerItemHeight = this.props.pickerItemHeight;
        scrollToYEasing_1.default(this.hourListView.rootElm, this.hourIndex * pickerItemHeight, 0.1);
        scrollToYEasing_1.default(this.minuteListView.rootElm, this.minuteIndex * pickerItemHeight, 0.1);
        scrollToYEasing_1.default(this.timeTypeListView.rootElm, this.timeTypeIndex * pickerItemHeight, 0.1);
        this.addBlurEventMethod();
    };
    TimePicker.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    TimePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, defaultShowPicker = _a.defaultShowPicker, defaultHour = _a.defaultHour, defaultMinute = _a.defaultMinute, onChangeTime = _a.onChangeTime, inputItemHeight = _a.inputItemHeight, pickerItemHeight = _a.pickerItemHeight, background = _a.background, attributes = __rest(_a, ["className", "defaultShowPicker", "defaultHour", "defaultMinute", "onChangeTime", "inputItemHeight", "pickerItemHeight", "background"]);
        var _b = this.state, currHour = _b.currHour, currMinute = _b.currMinute, showPicker = _b.showPicker;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "date-picker",
            styles: inlineStyles
        });
        var separator = React.createElement(Separator_1.default, { direction: "column", style: { margin: 0 } });
        var currTimeType = currHour < 13 ? "AM" : "PM";
        var hourArray = Array(12).fill(0).map(function (zero, index) { return index + 1; });
        var minuteArray = Array(60).fill(0).map(function (zero, index) { return index + 1; });
        var timeTypeArray = ["AM", "PM"];
        this.hourIndex = hourArray.indexOf(currHour > 12 ? currHour - 12 : currHour);
        this.minuteIndex = minuteArray.indexOf(currMinute);
        this.timeTypeIndex = timeTypeArray.indexOf(currTimeType);
        return (React.createElement(PseudoClasses_1.default, __assign({}, attributes, styles.root),
            React.createElement("div", __assign({}, attributes, { style: styles.root.style, className: theme.classNames(styles.root.className, className), ref: function (rootElm) { return _this.rootElm = rootElm; } }),
                React.createElement("div", __assign({}, styles.pickerModal),
                    React.createElement("div", __assign({}, styles.listViews),
                        React.createElement(ListView_1.default, { ref: function (hourListView) { return _this.hourListView = hourListView; }, style: inlineStyles.listView, listItemStyle: inlineStyles.listItem, defaultFocusListIndex: this.hourIndex, listSource: hourArray, onChooseItem: function (hourIndex) {
                                _this.setState({ currHour: currHour > 12 ? 13 + hourIndex : hourIndex + 1 });
                            } }),
                        React.createElement(ListView_1.default, { ref: function (minuteListView) { return _this.minuteListView = minuteListView; }, style: inlineStyles.listView, listItemStyle: inlineStyles.listItem, defaultFocusListIndex: this.minuteIndex, listSource: minuteArray, onChooseItem: function (minuteIndex) {
                                _this.setState({ currMinute: minuteIndex + 1 });
                            } }),
                        React.createElement(ListView_1.default, { ref: function (timeTypeListView) { return _this.timeTypeListView = timeTypeListView; }, style: inlineStyles.listView, listItemStyle: inlineStyles.listItem, defaultFocusListIndex: this.timeTypeIndex, listSource: timeTypeArray, onChooseItem: function (timeTypeIndex) {
                                if (timeTypeIndex === 0 && currHour > 12) {
                                    _this.setState({ currHour: currHour - 12 });
                                }
                                if (timeTypeIndex === 1 && currHour < 25) {
                                    _this.setState({ currHour: currHour + 12 });
                                }
                            } })),
                    React.createElement("div", __assign({}, styles.iconButtonGroup),
                        React.createElement(IconButton_1.default, { style: inlineStyles.iconButton, size: pickerItemHeight, onClick: function () {
                                _this.setState({ showPicker: false });
                                _this.prevState = { currHour: currHour, currMinute: currMinute };
                            } },
                            "AcceptLegacy",
                            React.createElement(RevealEffect_1.default, null)),
                        React.createElement(IconButton_1.default, { style: inlineStyles.iconButton, size: pickerItemHeight, onClick: function () {
                                var _a = _this.prevState, currHour = _a.currHour, currMinute = _a.currMinute;
                                _this.setState({ showPicker: false });
                                _this.setState({ currHour: currHour, currMinute: currMinute });
                            } },
                            "ClearLegacy",
                            React.createElement(RevealEffect_1.default, null)))),
                React.createElement("span", __assign({}, styles.button, { onClick: this.toggleShowPicker }), currHour > 12 ? currHour - 12 : currHour),
                separator,
                React.createElement("span", __assign({}, styles.button, { onClick: this.toggleShowPicker }), currMinute),
                separator,
                React.createElement("span", __assign({}, styles.button, { onClick: this.toggleShowPicker }), currTimeType),
                React.createElement(RevealEffect_1.default, null))));
    };
    TimePicker.defaultProps = {
        defaultShowPicker: false,
        inputItemHeight: 28,
        pickerItemHeight: 44,
        defaultHour: 12,
        defaultMinute: 30,
        onChangeTime: emptyFunc
    };
    TimePicker.contextTypes = { theme: PropTypes.object };
    return TimePicker;
}(React.Component));
exports.TimePicker = TimePicker;
function getStyles(TimePicker) {
    var theme = TimePicker.context.theme, _a = TimePicker.props, style = _a.style, inputItemHeight = _a.inputItemHeight, pickerItemHeight = _a.pickerItemHeight, background = _a.background, showPicker = TimePicker.state.showPicker;
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
            padding: pickerItemHeight * 3 + "px 0",
            height: pickerItemHeight * 7,
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
exports.default = TimePicker;
//# sourceMappingURL=index.js.map