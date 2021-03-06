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
var ReactDOM = require("react-dom");
var PropTypes = require("prop-types");
var setStyleToElement_1 = require("./utils/setStyleToElement");
var emptyFunc = function () { };
var ElementState = /** @class */ (function (_super) {
    __extends(ElementState, _super);
    function ElementState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visitedStyle = {};
        _this.setStyle = function (style) {
            setStyleToElement_1.default(_this.rootElm, _this.context.theme.prefixStyle(__assign(__assign({}, _this.props.style), style)));
        };
        _this.hover = function () {
            var child = _this.props.children;
            _this.setStyle(_this.props.hoverStyle);
            _this.props.onMouseEnter();
            _this.props.onHover();
        };
        _this.unHover = function () {
            _this.resetStyle();
            _this.props.onMouseLeave();
            _this.props.unHover();
        };
        _this.active = function () {
            _this.setStyle(_this.props.activeStyle);
            _this.props.onMouseDown();
            _this.props.onActive();
        };
        _this.unActive = function () {
            _this.setStyle(_this.props.hoverStyle);
            _this.props.onMouseUp();
            _this.props.unActive();
        };
        _this.focus = function () {
            _this.setStyle(_this.props.focusStyle);
            _this.props.onFocus();
        };
        _this.unFocus = function () {
            _this.resetStyle();
            _this.props.unFocus();
        };
        _this.visited = function () {
            _this.setStyle(_this.props.visitedStyle);
            _this.props.onClick();
            _this.props.onVisited();
            _this.visitedStyle = _this.props.visitedStyle;
        };
        _this.unVisited = function () {
            _this.resetStyle(true);
            _this.props.onClick();
            _this.props.unVisited();
        };
        _this.resetStyle = function (resetVisited) {
            if (resetVisited === void 0) { resetVisited = false; }
            if (resetVisited) {
                _this.visitedStyle = void 0;
            }
            setStyleToElement_1.default(_this.rootElm, __assign(__assign({}, _this.props.style), _this.visitedStyle), true);
        };
        return _this;
    }
    ElementState.prototype.componentDidMount = function () {
        this.rootElm = ReactDOM.findDOMNode(this);
        this.originStyle = __assign({}, this.rootElm.style);
    };
    ElementState.prototype.componentDidUpdate = function () {
        this.rootElm = ReactDOM.findDOMNode(this);
        this.originStyle = __assign({}, this.rootElm.style);
    };
    ElementState.prototype.render = function () {
        var _a = this.props, style = _a.style, hoverStyle = _a.hoverStyle, focusStyle = _a.focusStyle, activeStyle = _a.activeStyle, visitedStyle = _a.visitedStyle, disabledStyle = _a.disabledStyle, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, onClick = _a.onClick, onHover = _a.onHover, onFocus = _a.onFocus, onActive = _a.onActive, onVisited = _a.onVisited, unHover = _a.unHover, unFocus = _a.unFocus, unActive = _a.unActive, unVisited = _a.unVisited, visited = _a.visited, children = _a.children, disabled = _a.disabled, attributes = __rest(_a, ["style", "hoverStyle", "focusStyle", "activeStyle", "visitedStyle", "disabledStyle", "onMouseEnter", "onMouseLeave", "onMouseDown", "onMouseUp", "onClick", "onHover", "onFocus", "onActive", "onVisited", "unHover", "unFocus", "unActive", "unVisited", "visited", "children", "disabled"]);
        return React.cloneElement(children, __assign(__assign({}, attributes), { style: this.context.theme.prefixStyle(__assign(__assign({ transition: "all .25s" }, style), (disabled ? disabledStyle : void 0))), onMouseEnter: (hoverStyle && !disabled) ? this.hover : onMouseEnter, onMouseLeave: (hoverStyle && !disabled) ? this.unHover : onMouseLeave, onMouseDown: (activeStyle && !disabled) ? this.active : onMouseDown, onMouseUp: (activeStyle && !disabled) ? this.unActive : onMouseUp, onClick: (visitedStyle && !disabled) ? this.visited : onClick, onFocus: (focusStyle && !disabled) ? this.focus : onFocus }));
    };
    ElementState.defaultProps = {
        onHover: emptyFunc,
        onFocus: emptyFunc,
        onActive: emptyFunc,
        onVisited: emptyFunc,
        unHover: emptyFunc,
        unFocus: emptyFunc,
        unActive: emptyFunc,
        unVisited: emptyFunc,
        onMouseEnter: emptyFunc,
        onMouseLeave: emptyFunc,
        onMouseDown: emptyFunc,
        onMouseUp: emptyFunc,
        onClick: emptyFunc
    };
    ElementState.contextTypes = { theme: PropTypes.object };
    return ElementState;
}(React.Component));
exports.default = ElementState;
//# sourceMappingURL=ElementState.js.map