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
var ScrollBar = /** @class */ (function (_super) {
    __extends(ScrollBar, _super);
    function ScrollBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            mouseDowning: false
        };
        _this.loopIconMouseDownTimeOut = null;
        _this.translateX = 0;
        _this.translateY = 0;
        _this.addListeners = function () { };
        _this.removeListeners = function () { };
        _this.topIconClick = function (e) {
            _this.scrollTopByStep(true);
            _this.state.mouseDowning = true;
        };
        _this.topIconMouseDown = function (e) {
            _this.state.mouseDowning = true;
            _this.iconMouseDown(true);
        };
        _this.bottomIconClick = function (e) {
            _this.scrollTopByStep(false);
            _this.state.mouseDowning = true;
        };
        _this.bottomIconMouseDown = function () {
            _this.state.mouseDowning = true;
            _this.iconMouseDown(false);
        };
        _this.iconMouseUp = function (e) {
            clearTimeout(_this.loopIconMouseDownTimeOut);
            _this.state.mouseDowning = false;
        };
        _this.scrollTopByStep = function (toTop) {
            var style = _this.refs.view.style;
            var newTranslateY = _this.translateY + (toTop ? 40 : -40);
            _this.translateY = toTop ? (newTranslateY > 0 ? 0 : newTranslateY) : newTranslateY;
            style.transform = "translate3d(0px, " + _this.translateY + "px, 0px)";
        };
        _this.iconMouseDown = function (toTop) {
            _this.loopIconMouseDownTimeOut = setTimeout(function () {
                _this.scrollTopByStep(toTop);
                if (_this.state.mouseDowning)
                    _this.iconMouseDown(toTop);
            }, _this.props.scrollSpeed / 10);
        };
        return _this;
    }
    ScrollBar.prototype.componentDidMount = function () {
        this.addListeners();
    };
    ScrollBar.prototype.componentWillUnmount = function () {
        this.removeListeners();
    };
    ScrollBar.prototype.render = function () {
        var _a = this.props, showHorizontalBar = _a.showHorizontalBar, showVerticalBar = _a.showVerticalBar, scrollBarStyle = _a.scrollBarStyle, trackStyle = _a.trackStyle, thumbStyle = _a.thumbStyle, iconStyle = _a.iconStyle, scrollSpeed = _a.scrollSpeed, iconNode = _a.iconNode, children = _a.children, autoHide = _a.autoHide, attributes = __rest(_a, ["showHorizontalBar", "showVerticalBar", "scrollBarStyle", "trackStyle", "thumbStyle", "iconStyle", "scrollSpeed", "iconNode", "children", "autoHide"]);
        var styles = getStyles(this);
        return (React.createElement("div", __assign({}, attributes, { style: styles.root }),
            React.createElement("div", { style: styles.view, ref: "view" }, children),
            showHorizontalBar && (React.createElement("div", { style: __assign(__assign({}, styles.horizontal), { height: styles.horizontal.width, width: styles.horizontal.height }) },
                React.createElement("div", { style: __assign(__assign({}, styles.icon), { top: 0, left: 0 }) }),
                React.createElement("div", { style: __assign({}, styles.thumb) }),
                React.createElement("div", { style: __assign(__assign({}, styles.icon), { top: 0, right: 0 }) }))),
            showVerticalBar && (React.createElement("div", { style: styles.vertical },
                React.createElement("div", { onMouseDown: this.topIconMouseDown, onMouseUp: this.iconMouseUp, onClick: this.topIconClick, style: __assign(__assign({}, styles.icon), { left: 0, top: 0 }) }),
                React.createElement("div", { style: __assign(__assign({}, styles.thumb), { height: styles.thumb.width, width: styles.thumb.height }) }),
                React.createElement("div", { onClick: this.bottomIconClick, onMouseDown: this.bottomIconMouseDown, onMouseUp: this.iconMouseUp, style: __assign(__assign({}, styles.icon), { left: 0, bottom: 0 }) })))));
    };
    ScrollBar.defaultProps = {
        children: React.createElement("div", { style: { background: "linear-gradient(0deg, red 0%, blue 100%)", width: 400, height: 800 } }, "ScrollBar"),
        showHorizontalBar: false,
        showVerticalBar: true,
        scrollBarStyle: {
            width: 10,
            height: "100%",
            background: "#f1f1f1"
        },
        thumbStyle: {
            width: 80,
            background: "#969696"
        },
        iconStyle: {
            background: "#b1b1b1"
        },
        scrollSpeed: 250
    };
    return ScrollBar;
}(React.Component));
exports.default = ScrollBar;
function getStyles(scrollBar) {
    var _a = scrollBar.props, style = _a.style, scrollBarStyle = _a.scrollBarStyle, trackStyle = _a.trackStyle, thumbStyle = _a.thumbStyle, iconStyle = _a.iconStyle, scrollSpeed = _a.scrollSpeed;
    return {
        root: __assign({ position: "relative", overflow: "hidden", width: "100%", height: "100%" }, style),
        view: {
            WebkitOverflowScrolling: "touch",
            width: "100%",
            height: "100%",
            transition: "all " + scrollSpeed + "ms 0s linear",
            transform: "translate3d(0px, 0px, 0px)"
        },
        horizontal: __assign(__assign(__assign(__assign({}, scrollBarStyle), { position: "absolute", bottom: 0, left: 0 }), trackStyle), { paddingLeft: scrollBarStyle.width, paddingRight: scrollBarStyle.width }),
        vertical: __assign(__assign(__assign(__assign({}, scrollBarStyle), { position: "absolute", top: 0, right: 0 }), trackStyle), { paddingTop: scrollBarStyle.width, paddingBottom: scrollBarStyle.width }),
        thumb: __assign(__assign({ position: "absolute" }, scrollBarStyle), thumbStyle),
        icon: __assign(__assign({ zIndex: 1, position: "absolute", transition: "all .25s 0s ease-in-out" }, iconStyle), { width: scrollBarStyle.width, height: scrollBarStyle.width })
    };
}
//# sourceMappingURL=index.js.map