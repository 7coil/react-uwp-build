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
exports.FlipView = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var IconButton_1 = require("../IconButton");
var Swipe_1 = require("../Swipe");
var Dots_1 = require("./Dots");
var FlipView = /** @class */ (function (_super) {
    __extends(FlipView, _super);
    function FlipView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focusSwipeIndex: 0,
            currCanAutoSwipe: _this.props.autoSwipe,
            currShowNavigation: _this.props.showNavigation
        };
        _this.mounted = false;
        _this.swipeForward = function () {
            _this.swipe.swipeForward();
        };
        _this.swipeBackWord = function () {
            _this.swipe.swipeBackWord();
        };
        _this.handleChangeSwipe = function (focusSwipeIndex) {
            var count = React.Children.count(_this.props.children);
            if (_this.mounted) {
                _this.setState({ focusSwipeIndex: focusSwipeIndex % count });
            }
        };
        _this.toggleCanAutoSwipe = function (currCanAutoSwipe) {
            if (typeof currCanAutoSwipe === "boolean") {
                if (currCanAutoSwipe !== _this.state.currCanAutoSwipe) {
                    _this.setState({ currCanAutoSwipe: currCanAutoSwipe });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    currCanAutoSwipe: !prevState.currCanAutoSwipe
                }); });
            }
        };
        _this.handleSwipeToIndex = function (index) {
            _this.setState({ focusSwipeIndex: index });
            _this.swipe.swipeToIndex(index);
        };
        _this.handleMouseEnter = function (e) {
            if (!_this.state.currShowNavigation) {
                _this.setState({
                    currShowNavigation: true
                });
            }
        };
        _this.handleMouseLeave = function (e) {
            if (_this.state.currShowNavigation) {
                _this.setState({
                    currShowNavigation: false
                });
            }
        };
        return _this;
    }
    FlipView.prototype.componentDidMount = function () {
        this.mounted = true;
    };
    FlipView.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    };
    FlipView.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, children = _a.children, showNavigation = _a.showNavigation, initialFocusIndex = _a.initialFocusIndex, stopSwipe = _a.stopSwipe, autoSwipe = _a.autoSwipe, speed = _a.speed, easy = _a.easy, direction = _a.direction, navigationIconSize = _a.navigationIconSize, supportPcDrag = _a.supportPcDrag, showControl = _a.showControl, controlledNavigation = _a.controlledNavigation, attributes = __rest(_a, ["className", "children", "showNavigation", "initialFocusIndex", "stopSwipe", "autoSwipe", "speed", "easy", "direction", "navigationIconSize", "supportPcDrag", "showControl", "controlledNavigation"]);
        var theme = this.context.theme;
        var _b = this.state, focusSwipeIndex = _b.focusSwipeIndex, currCanAutoSwipe = _b.currCanAutoSwipe, currShowNavigation = _b.currShowNavigation;
        var count = React.Children.count(children);
        var isHorizontal = direction === "horizontal";
        var _showNavigation = controlledNavigation ? showNavigation : currShowNavigation;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "flip-view",
            styles: inlineStyles
        });
        return (React.createElement("div", { ref: function (element) { return _this.rootElm = element; }, style: styles.root.style, className: theme.classNames(styles.root.className, className), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
            count > 1 && _showNavigation && (React.createElement(IconButton_1.default, { onClick: this.swipeBackWord, style: inlineStyles.iconLeft, hoverStyle: {
                    background: theme.baseLow
                }, activeStyle: {
                    background: theme.accent,
                    color: "#fff"
                } }, isHorizontal ? "ChevronLeft3Legacy" : "ScrollChevronUpLegacy")),
            React.createElement(Swipe_1.default, __assign({ ref: function (swipe) { return _this.swipe = swipe; }, onChangeSwipe: function (index) { return _this.dots.setFocusIndex(index); } }, {
                children: children,
                initialFocusIndex: initialFocusIndex,
                stopSwipe: stopSwipe,
                autoSwipe: currCanAutoSwipe,
                speed: speed,
                easy: easy,
                direction: direction,
                navigationIconSize: navigationIconSize,
                supportPcDrag: supportPcDrag
            })),
            count > 1 && _showNavigation && (React.createElement(IconButton_1.default, { onClick: this.swipeForward, style: inlineStyles.iconRight, hoverStyle: {
                    background: theme.baseLow
                }, activeStyle: {
                    background: theme.accent,
                    color: "#fff"
                } }, isHorizontal ? "ChevronRight3Legacy" : "ScrollChevronDownLegacy")),
            React.createElement(Dots_1.default, __assign({ ref: function (dots) { return _this.dots = dots; } }, {
                count: count,
                showControl: showControl,
                controlStyle: inlineStyles.control,
                controlContentStyle: inlineStyles.controlContent,
                iconStyle: inlineStyles.icon,
                handleSwipeToIndex: this.handleSwipeToIndex,
                defaultFocusSwipeIndex: focusSwipeIndex,
                toggleCanAutoSwipe: this.toggleCanAutoSwipe,
                currCanAutoSwipe: currCanAutoSwipe
            }))));
    };
    FlipView.defaultProps = {
        direction: "horizontal",
        autoSwipe: true,
        navigationIconSize: 24,
        showNavigation: true,
        controlledNavigation: true,
        showControl: true,
        supportPcDrag: false,
        stopSwipe: false
    };
    FlipView.contextTypes = { theme: PropTypes.object };
    return FlipView;
}(React.Component));
exports.FlipView = FlipView;
function getStyles(flipView) {
    var _a = flipView.props, navigationIconSize = _a.navigationIconSize, direction = _a.direction, style = _a.style;
    var theme = flipView.context.theme;
    var prefixStyle = theme.prefixStyle;
    var isHorizontal = direction === "horizontal";
    var baseIconStyle = {
        position: "absolute",
        background: theme.listLow,
        zIndex: 20,
        fontSize: navigationIconSize / 2,
        width: navigationIconSize * (isHorizontal ? 1 : 2),
        lineHeight: navigationIconSize * (isHorizontal ? 2 : 1) + "px",
        height: navigationIconSize * (isHorizontal ? 2 : 1)
    };
    return {
        root: prefixStyle(__assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 0, width: "100%", background: theme.chromeLow, height: "auto", minHeight: baseIconStyle.height }, style)),
        iconLeft: __assign(__assign({}, baseIconStyle), { top: isHorizontal ? "calc(50% - " + navigationIconSize + "px)" : 0, left: isHorizontal ? 0 : "calc(50% - " + navigationIconSize + "px)" }),
        iconRight: __assign(__assign({}, baseIconStyle), { bottom: isHorizontal ? "calc(50% - " + navigationIconSize + "px)" : 0, right: isHorizontal ? 0 : "calc(50% - " + navigationIconSize + "px)" }),
        control: __assign({ display: "flex", justifyContent: "center", position: "absolute", pointerEvents: "none" }, (isHorizontal ? {
            flexDirection: "row",
            width: "100%",
            bottom: 4,
            left: 0
        } : {
            flexDirection: "column",
            height: "100%",
            top: 0,
            right: 4
        })),
        controlContent: prefixStyle({
            display: "flex",
            flexDirection: isHorizontal ? "row" : "column",
            alignItems: "center",
            pointerEvents: "all"
        }),
        icon: {
            fontSize: 6,
            margin: 2,
            cursor: "pointer"
        }
    };
}
exports.default = FlipView;
//# sourceMappingURL=index.js.map