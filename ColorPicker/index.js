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
exports.ColorPicker = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var IS_NODE_ENV_1 = require("../utils/nodeJS/IS_NODE_ENV");
var Slider_1 = require("../Slider");
var tinycolor = require("tinycolor2");
var emptyFunc = function () { };
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = tinycolor(_this.props.defaultColor).toHsv();
        _this.moveColorTimer = null;
        _this.originBodyStyle = IS_NODE_ENV_1.default ? void 0 : __assign({}, document.body.style);
        _this.setCanvas2devicePixelRatio = function () {
            var devicePixelRatio = window.devicePixelRatio;
            var _a = _this, canvas = _a.canvas, ctx = _a.ctx;
            if (!devicePixelRatio)
                return;
            var width = canvas.width, height = canvas.height;
            Object.assign(canvas, {
                width: width * devicePixelRatio,
                height: height * devicePixelRatio
            });
            Object.assign(canvas.style, {
                width: width + "px",
                height: height + "px"
            });
            ctx.scale(devicePixelRatio, devicePixelRatio);
        };
        _this.colorBarTimer = null;
        _this.handleColorBarChange = function (v) {
            clearTimeout(_this.colorBarTimer);
            var _a = _this.state, h = _a.h, s = _a.s;
            var _b = _this.props, onChangeColor = _b.onChangeColor, onChangedColor = _b.onChangedColor, onChangedColorTimeout = _b.onChangedColorTimeout;
            var colorHexString = tinycolor({ h: h, s: s, v: v }).toHexString();
            onChangeColor(colorHexString);
            _this.setState({ v: v }, function () { return onChangeColor(colorHexString); });
            _this.colorBarTimer = setTimeout(function () {
                onChangedColor(colorHexString);
            }, onChangedColorTimeout);
        };
        _this.clickTimer = null;
        _this.handleChooseColor = function (e, isClickEvent) {
            if (isClickEvent === void 0) { isClickEvent = true; }
            e.preventDefault();
            var isTouchEvent = e.type.includes("touch");
            var prefixStyle = _this.context.theme.prefixStyle;
            if (isClickEvent && (e.type === "mousedown" || e.type === "touchstart")) {
                document.documentElement.addEventListener("mousemove", _this.handleTouchMouseMove, false);
                document.documentElement.addEventListener("mouseup", _this.handleEnd);
                _this.canvas.addEventListener("touchmove", _this.handleTouchMouseMove, false);
                document.documentElement.addEventListener("touchend", _this.handleEnd);
                Object.assign(document.body.style, {
                    userSelect: "none",
                    msUserSelect: "none",
                    webkitUserSelect: "none",
                    cursor: "default"
                });
            }
            var _a = _this.props, size = _a.size, onChangeColor = _a.onChangeColor, onChangedColor = _a.onChangedColor, onChangedColorTimeout = _a.onChangedColorTimeout;
            var v = _this.state.v;
            var clientReact = _this.canvas.getBoundingClientRect();
            var colorPickerBoardSize = size * 0.8125 / 2;
            var _b = isTouchEvent ? e.changedTouches[0] : e, clientX = _b.clientX, clientY = _b.clientY;
            var x = clientX - clientReact.left - colorPickerBoardSize;
            var y = clientReact.top - clientY + colorPickerBoardSize;
            var r = Math.sqrt(x * x + y * y);
            var h = Math.asin(y / r) / Math.PI * 180;
            if (x > 0 && y > 0)
                h = 360 - h;
            if (x > 0 && y < 0)
                h = -h;
            if (x < 0 && y < 0)
                h = 180 + h;
            if (x < 0 && y > 0)
                h = 180 + h;
            var s = r / colorPickerBoardSize;
            if (s > 1)
                s = 1;
            var colorHexString = tinycolor({ h: h, s: s, v: v }).toHexString();
            if (_this.slider) {
                var halfLightColor = tinycolor({ h: h, s: s, v: 1 });
                _this.slider.barElm.style.backgroundImage = "linear-gradient(90deg, #000, " + halfLightColor.toHexString() + ")";
            }
            if (isClickEvent && e.type === "click") {
                onChangeColor(colorHexString);
                _this.setState({ h: h, s: s }, function () {
                    clearTimeout(_this.clickTimer);
                    _this.clickTimer = setTimeout(function () {
                        onChangedColor(colorHexString);
                    }, 0);
                });
            }
            else {
                onChangeColor(colorHexString);
                clearTimeout(_this.moveColorTimer);
                var r_1 = colorPickerBoardSize * s;
                var mainBoardDotSize = size / 25;
                var x_1 = Math.cos(h / 180 * Math.PI) * r_1;
                var y_1 = Math.sin(h / 180 * Math.PI) * r_1;
                Object.assign(_this.colorSelectorElm.style, prefixStyle({
                    transform: "translate3d(" + x_1 + "px, " + y_1 + "px, 0)"
                }));
                if (_this.colorMainBarElm) {
                    _this.colorMainBarElm.style.background = colorHexString;
                }
                _this.moveColorTimer = setTimeout(function () {
                    onChangedColor(colorHexString);
                    _this.setState({ h: h, s: s });
                }, onChangedColorTimeout);
            }
        };
        _this.handleTouchMouseMove = function (e) {
            if (!_this.state.dragging) {
                _this.setState({ dragging: true });
            }
            _this.handleChooseColor(e, false);
        };
        _this.handleEnd = function (e) {
            if (_this.state.dragging) {
                _this.setState({ dragging: false });
            }
            clearTimeout(_this.moveColorTimer);
            Object.assign(document.body.style, __assign({ userSelect: void 0, msUserSelect: void 0, webkitUserSelect: void 0, cursor: void 0 }, _this.originBodyStyle));
            document.documentElement.removeEventListener("mousemove", _this.handleTouchMouseMove);
            _this.canvas.removeEventListener("touchmove", _this.handleTouchMouseMove);
            document.documentElement.removeEventListener("mouseup", _this.handleEnd);
            document.documentElement.removeEventListener("touchend", _this.handleEnd);
        };
        return _this;
    }
    ColorPicker.prototype.componentDidMount = function () {
        this.renderCanvas();
        this.canvas.addEventListener("touchstart", this.handleChooseColor, false);
        this.canvas.addEventListener("touchend", this.handleEnd, false);
    };
    ColorPicker.prototype.componentDidUpdate = function () {
        this.renderCanvas();
    };
    ColorPicker.prototype.componentWillUnmount = function () {
        clearTimeout(this.moveColorTimer);
        this.canvas.removeEventListener("touchstart", this.handleChooseColor, false);
        this.canvas.removeEventListener("touchend", this.handleEnd, false);
    };
    ColorPicker.prototype.renderCanvas = function () {
        var size = this.props.size;
        size = size * 0.8125;
        Object.assign(this.canvas, {
            width: size,
            height: size
        });
        var _xPosition = size / 2;
        var _yPosition = _xPosition;
        var _r = _xPosition;
        var _pi_2 = Math.PI * 2;
        var _c = _r * _pi_2;
        this.ctx = this.canvas.getContext("2d");
        var ctx = this.ctx;
        this.setCanvas2devicePixelRatio();
        // use save when using clip Path
        ctx.save();
        ctx.arc(_xPosition, _yPosition, _r, 0, _pi_2, true);
        ctx.clip();
        var _a = this.state, v = _a.v, s = _a.s;
        for (var i = -1; i < 360; i++) {
            ctx.beginPath();
            ctx.moveTo(_xPosition, _yPosition);
            if (i === -1) {
                ctx.arc(_xPosition, _yPosition, _r, -_pi_2 / 360, 0, true);
            }
            else {
                ctx.arc(_xPosition, _yPosition, _r, 0, _pi_2 * i / 360, true);
            }
            ctx.closePath();
            var radialGradient = ctx.createRadialGradient(_xPosition, _yPosition, 0, _xPosition, _yPosition, _r);
            radialGradient.addColorStop(0, tinycolor("hsv(" + Math.abs(i) + ", 0%, " + v * 100 + "%)").toHexString());
            radialGradient.addColorStop(1, tinycolor("hsv(" + Math.abs(i) + ", 100%, " + v * 100 + "%)").toHexString());
            ctx.fillStyle = radialGradient;
            ctx.fill();
        }
        // reset clip to default
        ctx.restore();
    };
    ColorPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, size = _a.size, defaultColor = _a.defaultColor, onChangeColor = _a.onChangeColor, onChangedColor = _a.onChangedColor, onChangedColorTimeout = _a.onChangedColorTimeout, className = _a.className, attributes = __rest(_a, ["size", "defaultColor", "onChangeColor", "onChangedColor", "onChangedColorTimeout", "className"]);
        var _b = this.state, h = _b.h, s = _b.s, v = _b.v, dragging = _b.dragging;
        var theme = this.context.theme;
        var color = tinycolor({ h: h, s: s, v: v });
        var halfLightColor = tinycolor({ h: h, s: s, v: 1 });
        var colorPickerBoardSize = size * 0.8125 / 2;
        var r = colorPickerBoardSize * s;
        var mainBoardDotSize = size / 25;
        var x = Math.cos(h / 180 * Math.PI) * r;
        var y = Math.sin(h / 180 * Math.PI) * r;
        var selectorSize = colorPickerBoardSize - mainBoardDotSize / 2;
        var styles = getStyles(this);
        styles.colorSelector = __assign(__assign({}, styles.colorSelector), { top: selectorSize, left: selectorSize, width: mainBoardDotSize, height: mainBoardDotSize, borderRadius: mainBoardDotSize, background: "none", boxShadow: "0 0 0 4px #fff" });
        var classes = theme.prepareStyles({
            className: "color-picker",
            styles: styles
        });
        return (React.createElement("div", __assign({}, attributes, { style: classes.root.style, className: theme.classNames(classes.root.className, className) }),
            React.createElement("div", __assign({}, classes.board),
                React.createElement("div", { style: { position: "relative" } },
                    React.createElement("canvas", __assign({}, classes.mainBoard, { ref: function (canvas) { return _this.canvas = canvas; }, onClick: this.handleChooseColor, onMouseDown: this.handleChooseColor, onMouseUp: this.handleEnd }), "Your Browser not support canvas."),
                    React.createElement("div", { ref: function (colorSelectorElm) { return _this.colorSelectorElm = colorSelectorElm; }, className: classes.colorSelector.className, style: theme.prefixStyle(__assign(__assign({}, classes.colorSelector.style), { transform: "translate3d(" + x + "px, " + y + "px, 0)" })) })),
                React.createElement("div", __assign({}, classes.colorMainBar, { ref: function (colorMainBarElm) { return _this.colorMainBarElm = colorMainBarElm; } }))),
            React.createElement(Slider_1.default, { maxValue: 1, ref: function (slider) { return _this.slider = slider; }, onChangeValue: this.handleColorBarChange, style: { marginTop: size * 0.0125, width: "100%" }, initValue: v, width: size, barHeight: size * 0.025, barBackgroundImage: "linear-gradient(90deg, #000, " + halfLightColor.toHexString() + ")", useSimpleController: true })));
    };
    ColorPicker.defaultProps = {
        size: 336,
        defaultColor: "hsv(210, 100%, 100%)",
        onChangeColor: emptyFunc,
        onChangedColor: emptyFunc,
        onChangedColorTimeout: 1000 / 24
    };
    ColorPicker.contextTypes = { theme: PropTypes.object };
    return ColorPicker;
}(React.Component));
exports.ColorPicker = ColorPicker;
function getStyles(colorPicker) {
    var theme = colorPicker.context.theme, _a = colorPicker.props, style = _a.style, size = _a.size, _b = colorPicker.state, h = _b.h, s = _b.s, v = _b.v;
    var prefixStyle = theme.prefixStyle;
    var currColor = tinycolor({ h: h, s: s, v: v }).toHslString();
    return {
        root: prefixStyle(__assign({ display: "inline-block", verticalAlign: "middle", width: size, flexDirection: "column" }, style)),
        board: prefixStyle({
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }),
        mainBoard: prefixStyle({
            userDrag: "none",
            margin: 0,
            userSelect: "none"
        }),
        colorMainBar: {
            height: size * 0.8125,
            marginLeft: size * 0.025,
            width: size * 0.125,
            background: currColor
        },
        colorSelector: prefixStyle({
            pointerEvents: "none",
            userDrag: "none",
            position: "absolute"
        })
    };
}
exports.default = ColorPicker;
//# sourceMappingURL=index.js.map