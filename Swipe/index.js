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
var shallowEqual_1 = require("../utils/shallowEqual");
var IS_NODE_ENV_1 = require("../utils/nodeJS/IS_NODE_ENV");
var emptyFunc = function () { };
var Swipe = /** @class */ (function (_super) {
    __extends(Swipe, _super);
    function Swipe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSingleChildren = React.Children.count(_this.props.children) === 1;
        _this.state = (function (_a) {
            var direction = _a.direction, initialFocusIndex = _a.initialFocusIndex, stopSwipe = _a.stopSwipe, children = _a.children;
            return ({
                isHorizontal: direction === "horizontal",
                isSingleChildren: _this.isSingleChildren,
                focusIndex: _this.isSingleChildren ? initialFocusIndex : initialFocusIndex + 1,
                currStopSwipe: stopSwipe,
                childrenLength: React.Children.count(children),
                haveAnimate: false,
                swiping: false
            });
        })(_this.props);
        _this.originBodyStyle = IS_NODE_ENV_1.default ? void 0 : __assign({}, document.body.style);
        _this.updateState = function (props, setToState) {
            if (setToState === void 0) { setToState = false; }
            clearTimeout(_this.timeoutId);
            var childrenLength = React.Children.count(props.children);
            var isSingleChildren = childrenLength === 1;
            if (setToState) {
                _this.setState({
                    isHorizontal: props.direction === "horizontal",
                    childrenLength: childrenLength,
                    isSingleChildren: isSingleChildren,
                    currStopSwipe: !props.autoSwipe
                });
            }
            if (props.autoSwipe && !isSingleChildren) {
                _this.timeoutId = setTimeout(function () {
                    _this.swipeForward();
                    _this.setNextSlider();
                }, props.delay);
                _this.setNextSlider.funStartTime = Date.now();
            }
        };
        _this.setNextSlider = function () {
            var delay = _this.props.delay;
            if (_this.state.currStopSwipe || (_this.setNextSlider.funStartTime && Date.now() - _this.setNextSlider.funStartTime < delay))
                return;
            _this.timeoutId = setTimeout(function () {
                if (!_this.state.currStopSwipe)
                    _this.swipeForward();
                _this.setNextSlider();
            }, delay);
            _this.setNextSlider.funStartTime = Date.now();
        };
        _this.getFocusIndex = function () { return _this.state.focusIndex; };
        _this.swipeToIndex = function (focusIndex) {
            clearTimeout(_this.timeoutId);
            focusIndex = focusIndex + 1;
            _this.setState({
                haveAnimate: true,
                focusIndex: _this.setRightFocusIndex(focusIndex),
                currStopSwipe: true
            });
        };
        _this.swipeForward = function () {
            var _a = _this.state, focusIndex = _a.focusIndex, swiping = _a.swiping, isSingleChildren = _a.isSingleChildren;
            if (swiping)
                return;
            if (!isSingleChildren)
                _this.props.onChangeSwipe(focusIndex);
            _this.state.swiping = true;
            var isLast = focusIndex === _this.getItemsLength() - 2;
            if (isLast) {
                _this.setState({
                    focusIndex: _this.setRightFocusIndex(focusIndex + 1),
                    haveAnimate: true
                }, function () {
                    _this.swipeTimer = setTimeout(function () {
                        _this.setState({
                            focusIndex: 1,
                            haveAnimate: false
                        });
                        _this.state.swiping = false;
                    }, _this.props.speed);
                });
            }
            else {
                _this.setState({
                    focusIndex: _this.setRightFocusIndex(focusIndex + 1),
                    haveAnimate: true
                });
                _this.swipeTimer = setTimeout(function () {
                    _this.state.swiping = false;
                }, _this.props.speed);
            }
        };
        _this.swipeBackWord = function () {
            var _a = _this.state, focusIndex = _a.focusIndex, swiping = _a.swiping, isSingleChildren = _a.isSingleChildren;
            if (swiping || !_this.props.autoSwipe)
                return;
            if (!isSingleChildren)
                _this.props.onChangeSwipe(focusIndex);
            _this.state.swiping = true;
            var isFirst = focusIndex === 1;
            if (isFirst) {
                _this.setState({
                    focusIndex: _this.setRightFocusIndex(focusIndex - 1),
                    haveAnimate: true
                }, function () {
                    _this.swipeTimer = setTimeout(function () {
                        _this.setState({
                            focusIndex: _this.getItemsLength() - 2,
                            haveAnimate: false
                        });
                        _this.state.swiping = false;
                    }, _this.props.speed);
                });
            }
            else {
                _this.setState({
                    focusIndex: _this.setRightFocusIndex(focusIndex - 1),
                    haveAnimate: true
                });
                _this.swipeTimer = setTimeout(function () {
                    _this.state.swiping = false;
                }, _this.props.speed);
            }
        };
        _this.getItemsLength = function () {
            var children = _this.props.children;
            var childrenSize = React.Children.toArray(children).length;
            return childrenSize > 1 ? childrenSize + 2 : childrenSize;
        };
        _this.setRightFocusIndex = function (focusIndex) {
            var length = _this.getItemsLength();
            return focusIndex < 0 ? length - Math.abs(focusIndex) % length : focusIndex % length;
        };
        _this.checkIsToucheEvent = function (e) { return e.type.includes("touch"); };
        _this.mouseOrTouchDownHandler = function (e) {
            Object.assign(document.body.style, {
                userSelect: "none",
                msUserSelect: "none",
                webkitUserSelect: "none"
            });
            _this.endClientX = void 0;
            _this.endClientY = void 0;
            var isHorizontal = _this.state.isHorizontal;
            _this.setState({ currStopSwipe: true });
            var isToucheEvent = _this.checkIsToucheEvent(e);
            if (!isToucheEvent && !_this.props.supportPcDrag)
                return;
            if (isToucheEvent) {
                window.addEventListener("touchmove", _this.mouseOrTouchMoveHandler);
                window.addEventListener("touchend", _this.mouseOrTouchUpHandler);
            }
            else {
                window.addEventListener("mousemove", _this.mouseOrTouchMoveHandler);
                window.addEventListener("mouseup", _this.mouseOrTouchUpHandler);
            }
            if (isToucheEvent) {
                if (isHorizontal) {
                    _this.startClientX = e.changedTouches[0].clientX;
                }
                else {
                    _this.startClientY = e.changedTouches[0].clientY;
                }
            }
            else {
                if (isHorizontal) {
                    _this.startClientX = e.clientX;
                }
                else {
                    _this.startClientY = e.clientY;
                }
            }
            _this.refs.content.style.webkitTransition = "all 0.06125s 0s linear";
        };
        _this.mouseOrTouchMoveHandler = function (e) {
            Object.assign(document.body.style, __assign({ userSelect: void 0, msUserSelect: void 0, webkitUserSelect: void 0 }, _this.originBodyStyle));
            var isToucheEvent = _this.checkIsToucheEvent(e);
            var _a = _this.state, focusIndex = _a.focusIndex, isHorizontal = _a.isHorizontal;
            if (isToucheEvent) {
                if (isHorizontal) {
                    _this.endClientX = e.changedTouches[0].clientX;
                }
                else {
                    _this.endClientY = e.changedTouches[0].clientY;
                }
            }
            else {
                if (isHorizontal) {
                    _this.endClientX = e.clientX;
                }
                else {
                    _this.endClientY = e.clientY;
                }
            }
            _this.refs.content.style.webkitTransform = "translate" + (isHorizontal ? "X" : "Y") + "(" + (_this.refs.container.getBoundingClientRect()[isHorizontal ? "width" : "height"] * (-focusIndex) - _this[isHorizontal ? "startClientX" : "startClientY"] + _this[isHorizontal ? "endClientX" : "endClientY"]) + "px)";
        };
        _this.mouseOrTouchUpHandler = function (e) {
            Object.assign(document.body.style, __assign({ userSelect: void 0, msUserSelect: void 0, webkitUserSelect: void 0, cursor: void 0 }, _this.originBodyStyle));
            var _a = _this.state, childrenLength = _a.childrenLength, isHorizontal = _a.isHorizontal;
            var _b = _this.props, transitionTimingFunction = _b.transitionTimingFunction, speed = _b.speed;
            var isToucheEvent = _this.checkIsToucheEvent(e);
            if (isToucheEvent) {
                window.removeEventListener("touchmove", _this.mouseOrTouchMoveHandler);
                window.removeEventListener("touchend", _this.mouseOrTouchUpHandler);
            }
            else {
                window.removeEventListener("mousemove", _this.mouseOrTouchMoveHandler);
                window.removeEventListener("mouseup", _this.mouseOrTouchUpHandler);
            }
            if ((isHorizontal && _this.endClientX === void 0) || (!isHorizontal && _this.endClientY === void 0)) {
                return;
            }
            var transition = "all " + speed + "ms 0s " + transitionTimingFunction;
            _this.refs.content.style.webkitTransition = transition;
            _this.state.currStopSwipe = false;
            var easy = _this.props.easy;
            if (easy < 0)
                easy = 0;
            if (easy > 1)
                easy = 1;
            var movePosition = _this.endClientX - _this.startClientX;
            var isNext = movePosition < 0;
            var focusIndex = _this.state.focusIndex + movePosition / _this.refs.container.getBoundingClientRect().width;
            focusIndex = isNext ? Math.ceil(focusIndex + easy / 2) : Math.floor(focusIndex - easy / 2);
            focusIndex = _this.setRightFocusIndex(focusIndex);
            if (focusIndex === _this.state.focusIndex) {
                _this.refs.content.style.webkitTransform = "translateX(" + (_this.refs.container.getBoundingClientRect().width * (-focusIndex / childrenLength) - _this.startClientX + _this.endClientX) + "px)";
            }
            else {
                if (isNext) {
                    _this.swipeForward();
                }
                else {
                    _this.swipeBackWord();
                }
            }
            if (_this.props.autoSwipe && !_this.state.isSingleChildren && 0) {
                _this.setNextSlider();
            }
        };
        return _this;
    }
    Swipe.prototype.componentDidMount = function () {
        this.containerDOM = this.refs.container;
        this.updateState(this.props);
    };
    Swipe.prototype.componentWillReceiveProps = function (nextProps) {
        if (!shallowEqual_1.default(nextProps, this.props)) {
            this.updateState(nextProps, true);
        }
    };
    Swipe.prototype.componentWillUnmount = function () {
        clearTimeout(this.timeoutId);
        clearTimeout(this.swipeTimer);
    };
    Swipe.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, initialFocusIndex = _a.initialFocusIndex, showIcon = _a.showIcon, animate = _a.animate, stopSwipe = _a.stopSwipe, autoSwipe = _a.autoSwipe, speed = _a.speed, delay = _a.delay, easy = _a.easy, direction = _a.direction, style = _a.style, transitionTimingFunction = _a.transitionTimingFunction, navigationIconSize = _a.navigationIconSize, supportPcDrag = _a.supportPcDrag, onChangeSwipe = _a.onChangeSwipe, attributes = __rest(_a, ["children", "className", "initialFocusIndex", "showIcon", "animate", "stopSwipe", "autoSwipe", "speed", "delay", "easy", "direction", "style", "transitionTimingFunction", "navigationIconSize", "supportPcDrag", "onChangeSwipe"]);
        var _b = this.state, focusIndex = _b.focusIndex, currStopSwipe = _b.currStopSwipe, childrenLength = _b.childrenLength, isSingleChildren = _b.isSingleChildren, isHorizontal = _b.isHorizontal, haveAnimate = _b.haveAnimate;
        var theme = this.context.theme;
        var childrenArray = React.Children.toArray(children);
        var childrenSize = childrenArray.length;
        if (childrenSize > 1) {
            childrenArray.push(childrenArray[0]);
            childrenArray.unshift(childrenArray[childrenSize - 1]);
        }
        var transition = "transform " + speed + "ms 0s " + transitionTimingFunction;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "swipe",
            styles: inlineStyles
        });
        return (React.createElement("div", __assign({}, attributes, { ref: "container", style: styles.root.style, className: theme.classNames(styles.root.className, className) }),
            React.createElement("div", { onMouseDown: (!stopSwipe && !isSingleChildren) ? this.mouseOrTouchDownHandler : void 0, onTouchStart: (!stopSwipe && !isSingleChildren) ? this.mouseOrTouchDownHandler : void 0, ref: "content", style: theme.prefixStyle(__assign(__assign({}, styles.content.style), { transform: "translate" + (isHorizontal ? "X" : "Y") + "(" + -focusIndex * 100 / childrenLength + "%)", transition: haveAnimate ? transition : void 0 })), className: styles.content.className }, childrenArray.map(function (child, index) { return (React.createElement("div", __assign({ "data-index": index }, styles.item, { key: "" + index }), child)); }))));
    };
    Swipe.defaultProps = {
        direction: "horizontal",
        autoSwipe: true,
        className: "",
        animate: "slide",
        transitionTimingFunction: "ease-in-out",
        initialFocusIndex: 0,
        stopSwipe: false,
        speed: 1500,
        delay: 5000,
        easy: 0.85,
        supportPcDrag: false,
        onChangeSwipe: emptyFunc
    };
    Swipe.contextTypes = { theme: PropTypes.object };
    return Swipe;
}(React.Component));
exports.default = Swipe;
function getStyles(swipe) {
    var _a = swipe.props, transitionTimingFunction = _a.transitionTimingFunction, speed = _a.speed, style = _a.style;
    var transition = "transform " + speed + "ms 0s " + transitionTimingFunction;
    var _b = swipe.state, focusIndex = _b.focusIndex, childrenLength = _b.childrenLength, isHorizontal = _b.isHorizontal, isSingleChildren = _b.isSingleChildren, haveAnimate = _b.haveAnimate;
    var prefixStyle = swipe.context.theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ position: "relative", display: "flex", flexDirection: isHorizontal ? "row" : "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", overflow: "hidden", flex: "0 0 auto" }, style)),
        content: prefixStyle({
            position: "relative",
            flex: "0 0 auto",
            display: "flex",
            flexDirection: isHorizontal ? "row" : "column",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            height: isHorizontal ? "100%" : childrenLength * 100 + "%",
            width: isHorizontal ? childrenLength * 100 + "%" : "100%",
            left: (isHorizontal && !isSingleChildren) ? ((isSingleChildren ? 0 : 2 + childrenLength) / 2 - 0.5) * 100 + "%" : void 0,
            top: isHorizontal ? void 0 : ((isSingleChildren ? 0 : 2 + childrenLength) / 2 - 0.5) * 100 + "%"
        }),
        item: prefixStyle({
            position: "relative",
            overflow: "hidden",
            width: isHorizontal ? 100 / childrenLength + "%" : "100%",
            height: isHorizontal ? "100%" : 100 / childrenLength + "%",
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            userDrag: "none",
            WebkitUserDrag: "none"
        })
    };
}
//# sourceMappingURL=index.js.map