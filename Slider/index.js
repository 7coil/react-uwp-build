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
exports.Slider = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var IS_NODE_ENV_1 = require("../utils/nodeJS/IS_NODE_ENV");
var emptyFunc = function () { };
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.originBodyStyle = IS_NODE_ENV_1.default ? void 0 : __assign({}, document.body.style);
        _this.state = {
            currValue: _this.props.initValue,
            valueRatio: _this.props.initValue / (_this.props.maxValue - _this.props.minValue)
        };
        _this.throttleNow = null;
        _this.throttleNowTimer = null;
        _this.onChangedValueTimer = null;
        _this.handelMouseEnter = function (e) {
            _this.setState({ hovered: true });
        };
        _this.handelMouseLeave = function (e) {
            _this.setState({ hovered: false });
        };
        _this.handelOnClick = function (e) {
            _this.setValueByEvent(e);
        };
        _this.handleDraggingStart = function (e) {
            e.preventDefault();
            Object.assign(document.body.style, {
                userSelect: "none",
                msUserSelect: "none",
                webkitUserSelect: "none",
                cursor: "default"
            });
            document.documentElement.addEventListener("mousemove", _this.setValueByEvent);
            document.documentElement.addEventListener("touchmove", _this.setValueByEvent);
            document.documentElement.addEventListener("mouseup", _this.handleDragged);
            document.documentElement.addEventListener("touchend", _this.handleDragged);
        };
        _this.handleDragged = function (e) {
            Object.assign(document.body.style, __assign({ userSelect: void 0, msUserSelect: void 0, webkitUserSelect: void 0, cursor: void 0 }, _this.originBodyStyle));
            if (_this.state.dragging) {
                _this.setState({ dragging: false });
            }
            document.documentElement.removeEventListener("mousemove", _this.setValueByEvent);
            document.documentElement.removeEventListener("touchmove", _this.setValueByEvent);
            document.documentElement.removeEventListener("mouseup", _this.handleDragged);
            document.documentElement.removeEventListener("touchend", _this.handleDragged);
        };
        _this.setValueByEvent = function (e, type) {
            var isTouchEvent = e.type.includes("touch");
            clearTimeout(_this.onChangedValueTimer);
            var isDraggingEvent = e.type === "mousemove" || e.type === "touchmove";
            if (isDraggingEvent && !_this.state.dragging) {
                e.preventDefault();
                _this.setState({ dragging: true });
            }
            if (isDraggingEvent) {
                var nowTime = performance ? performance.now() : Date.now();
                if (!_this.throttleNow || (nowTime - _this.throttleNow > _this.props.throttleTimer)) {
                    clearTimeout(_this.throttleNowTimer);
                    _this.throttleNow = nowTime;
                }
                else {
                    _this.throttleNowTimer = setTimeout(function () {
                        _this.setValueByEvent(e, type);
                    }, _this.props.throttleTimer);
                    return;
                }
            }
            var _a = _this.props, displayMode = _a.displayMode, maxValue = _a.maxValue, minValue = _a.minValue, barBackground = _a.barBackground, barBackgroundImage = _a.barBackgroundImage, label = _a.label, numberToFixed = _a.numberToFixed, unit = _a.unit, onChangeValue = _a.onChangeValue, onChangedValue = _a.onChangedValue, onChangeValueRatio = _a.onChangeValueRatio;
            var isHorizonMode = displayMode === "horizon";
            var useCustomBackground = barBackground || barBackgroundImage;
            var _b = _this.rootElm.getBoundingClientRect(), left = _b.left, width = _b.width, bottom = _b.bottom, height = _b.height;
            var _c = isTouchEvent ? e.changedTouches[0] : e, clientX = _c.clientX, clientY = _c.clientY;
            var controllerClientRect = _this.controllerElm.getBoundingClientRect();
            var controllerWidth = controllerClientRect.width;
            var controllerHeight = controllerClientRect.height;
            var valueRatio = isHorizonMode ? (clientX - left) / (width - controllerWidth) : -(clientY - bottom) / (height - controllerHeight);
            valueRatio = valueRatio < 0 ? 0 : (valueRatio > 1 ? 1 : valueRatio);
            var currValue = minValue + (maxValue - minValue) * valueRatio;
            _this.state.currValue = currValue;
            _this.state.valueRatio = valueRatio;
            if (e.type === "click" || e.type === "touchstart") {
                _this.setState({ currValue: currValue });
            }
            else {
                if (!useCustomBackground) {
                    var barTransform = "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? (valueRatio - 1) : (1 - valueRatio)) * 100 + "%)";
                    Object.assign(_this.barElm.style, {
                        transform: barTransform,
                        webKitTransform: barTransform,
                        msTransform: barTransform,
                        mozTransform: barTransform
                    });
                }
                var transform = "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? valueRatio : 1 - valueRatio) * 100 + "%)";
                Object.assign(_this.controllerWrapperElm.style, {
                    transform: transform,
                    webKitTransform: transform,
                    msTransform: transform,
                    mozTransform: transform
                });
                if (label)
                    _this.labelElm.innerText = "" + currValue.toFixed(numberToFixed) + unit;
            }
            onChangeValue(currValue);
            onChangeValueRatio(valueRatio);
            _this.onChangedValueTimer = setTimeout(function () {
                onChangedValue(currValue);
                onChangeValueRatio(valueRatio);
            }, 0);
        };
        return _this;
    }
    Slider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.state.currValue !== nextProps.initValue) {
            this.setState({ currValue: nextProps.initValue });
        }
    };
    Slider.prototype.componentDidMount = function () {
        this.rootElm.addEventListener("touchstart", this.handleDraggingStart, false);
        this.rootElm.addEventListener("touchend", this.handleDragged, false);
    };
    Slider.prototype.componentWillUnmount = function () {
        clearTimeout(this.throttleNowTimer);
        clearTimeout(this.onChangedValueTimer);
        this.rootElm.removeEventListener("touchstart", this.handleDraggingStart, false);
        this.rootElm.removeEventListener("touchend", this.handleDragged, false);
    };
    Slider.prototype.render = function () {
        var _this = this;
        var _a = this.props, minValue = _a.minValue, maxValue = _a.maxValue, initValue = _a.initValue, onChangeValue = _a.onChangeValue, onChangeValueRatio = _a.onChangeValueRatio, onChangedValue = _a.onChangedValue, onChangedValueRatio = _a.onChangedValueRatio, barHeight = _a.barHeight, controllerWidth = _a.controllerWidth, barBackground = _a.barBackground, barBackgroundImage = _a.barBackgroundImage, useSimpleController = _a.useSimpleController, showValueInfo = _a.showValueInfo, numberToFixed = _a.numberToFixed, unit = _a.unit, customControllerStyle = _a.customControllerStyle, transition = _a.transition, throttleTimer = _a.throttleTimer, displayMode = _a.displayMode, attributes = __rest(_a, ["minValue", "maxValue", "initValue", "onChangeValue", "onChangeValueRatio", "onChangedValue", "onChangedValueRatio", "barHeight", "controllerWidth", "barBackground", "barBackgroundImage", "useSimpleController", "showValueInfo", "numberToFixed", "unit", "customControllerStyle", "transition", "throttleTimer", "displayMode"]);
        var currValue = this.state.currValue;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "slider",
            styles: inlineStyles
        });
        var normalRender = (React.createElement("div", __assign({ ref: function (elm) { return _this.rootElm = elm; } }, styles.root, { onMouseEnter: this.handelMouseEnter, onMouseLeave: this.handelMouseLeave, onClick: this.setValueByEvent, onTouchStart: this.setValueByEvent, onMouseDown: this.handleDraggingStart, onMouseUp: this.handleDragged }),
            React.createElement("div", __assign({}, styles.barContainer),
                React.createElement("div", __assign({}, styles.bar, { ref: function (elm) { return _this.barElm = elm; } }))),
            React.createElement("div", __assign({}, styles.controllerWrapper, { ref: function (controllerWrapperElm) { return _this.controllerWrapperElm = controllerWrapperElm; } }),
                React.createElement("div", __assign({}, styles.controller, { ref: function (controllerElm) { return _this.controllerElm = controllerElm; } })))));
        return (React.createElement("div", __assign({}, attributes, styles.wrapper), showValueInfo ? (React.createElement("div", __assign({}, styles.infoWrapper),
            normalRender,
            React.createElement("span", __assign({ ref: function (labelElm) { return _this.labelElm = labelElm; } }, styles.label), "" + currValue.toFixed(numberToFixed) + unit))) : normalRender));
    };
    Slider.defaultProps = {
        displayMode: "horizon",
        minValue: 0,
        maxValue: 1,
        initValue: 0,
        onChangeValue: emptyFunc,
        onChangedValue: emptyFunc,
        onChangeValueRatio: emptyFunc,
        onChangedValueRatio: emptyFunc,
        height: 24,
        barHeight: 2,
        controllerWidth: 8,
        showValueInfo: false,
        numberToFixed: 0,
        unit: "",
        transition: "all 0.25s",
        throttleTimer: 120 / 1000
    };
    Slider.contextTypes = { theme: PropTypes.object };
    return Slider;
}(React.Component));
exports.Slider = Slider;
function getStyles(slider) {
    var theme = slider.context.theme, _a = slider.props, transition = _a.transition, maxValue = _a.maxValue, style = _a.style, height = _a.height, barHeight = _a.barHeight, controllerWidth = _a.controllerWidth, barBackground = _a.barBackground, barBackgroundImage = _a.barBackgroundImage, useSimpleController = _a.useSimpleController, customControllerStyle = _a.customControllerStyle, showValueInfo = _a.showValueInfo, displayMode = _a.displayMode, _b = slider.state, currValue = _b.currValue, dragging = _b.dragging, hovered = _b.hovered;
    var prefixStyle = theme.prefixStyle;
    var isHorizonMode = displayMode === "horizon";
    var height2px = Number.parseFloat(height);
    var barHeight2px = Number.parseFloat(barHeight);
    var controllerWidth2px = Number.parseFloat(controllerWidth);
    var currTransition = dragging ? void 0 : (transition || void 0);
    var useCustomBackground = barBackground || barBackgroundImage;
    var valueRatio = currValue / maxValue;
    return {
        wrapper: prefixStyle(__assign({ width: isHorizonMode ? 320 : height2px, height: isHorizonMode ? height2px : 320, display: "inline-block", verticalAlign: "middle" }, style)),
        root: prefixStyle({
            flex: showValueInfo ? "0 0 auto" : void 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: isHorizonMode ? "100%" : height2px,
            height: isHorizonMode ? height2px : "100%",
            cursor: "default",
            position: "relative"
        }),
        barContainer: {
            background: theme.baseLow,
            position: "absolute",
            width: isHorizonMode ? "100%" : barHeight,
            height: isHorizonMode ? barHeight : "100%",
            overflow: "hidden",
            left: isHorizonMode ? 0 : "calc(50% - " + barHeight2px / 2 + "px)",
            top: isHorizonMode ? "calc(50% - " + barHeight2px / 2 + "px)" : 0
        },
        infoWrapper: prefixStyle({
            display: "flex",
            flexDirection: displayMode === "horizon" ? "row" : "column",
            alignItems: "center"
        }),
        bar: prefixStyle({
            transition: currTransition,
            background: useCustomBackground ? barBackground : theme.listAccentLow,
            backgroundImage: barBackgroundImage,
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            inlineStyle: {
                transform: useCustomBackground ? void 0 : "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? (valueRatio - 1) : (1 - valueRatio)) * 100 + "%)"
            }
        }),
        controllerWrapper: prefixStyle({
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transition: currTransition,
            inlineStyle: {
                transform: "translate" + (isHorizonMode ? "X" : "Y") + "(" + (isHorizonMode ? valueRatio : 1 - valueRatio) * 100 + "%)"
            }
        }),
        controller: prefixStyle(__assign({ pointerEvents: "none", transition: currTransition, display: "inline-block", background: (useSimpleController || dragging || hovered) ? theme.baseHigh : theme.accent, borderRadius: controllerWidth2px / 2, width: isHorizonMode ? controllerWidth2px : height2px, height: isHorizonMode ? height2px : controllerWidth2px, float: "left", transform: "translate3d(" + (isHorizonMode ? -controllerWidth2px / 2 : 0) + "px, 0, 0)" }, customControllerStyle)),
        label: {
            flex: showValueInfo ? "0 0 auto" : void 0,
            display: "inline-block",
            marginLeft: 12,
            fontSize: height2px / 1.5,
            lineHeight: height2px / 1.5 + "px",
            color: theme.baseMediumHigh
        }
    };
}
exports.default = Slider;
//# sourceMappingURL=index.js.map