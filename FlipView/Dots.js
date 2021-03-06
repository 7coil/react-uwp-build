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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dots = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var IconButton_1 = require("../IconButton");
var Icon_1 = require("../Icon");
var Dots = /** @class */ (function (_super) {
    __extends(Dots, _super);
    function Dots() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focusSwipeIndex: _this.props.defaultFocusSwipeIndex
        };
        _this.setFocusIndex = function (focusSwipeIndex) { return _this.setState({ focusSwipeIndex: focusSwipeIndex % _this.props.count }); };
        return _this;
    }
    Dots.prototype.render = function () {
        var _this = this;
        var _a = this.props, count = _a.count, showControl = _a.showControl, controlStyle = _a.controlStyle, controlContentStyle = _a.controlContentStyle, iconStyle = _a.iconStyle, handleSwipeToIndex = _a.handleSwipeToIndex, defaultFocusSwipeIndex = _a.defaultFocusSwipeIndex, toggleCanAutoSwipe = _a.toggleCanAutoSwipe, currCanAutoSwipe = _a.currCanAutoSwipe;
        var focusSwipeIndex = this.state.focusSwipeIndex;
        var theme = this.context.theme;
        var styles = theme.prepareStyles({
            className: "flip-view-control",
            styles: {
                controlStyle: controlStyle,
                controlContentStyle: controlContentStyle
            }
        });
        return (count > 1 && showControl && (React.createElement("div", __assign({}, styles.controlStyle),
            React.createElement("div", __assign({}, styles.controlContentStyle),
                Array(count).fill(0).map(function (numb, index) { return (React.createElement(Icon_1.default, { style: iconStyle, onClick: function () {
                        _this.setState({ focusSwipeIndex: index });
                        handleSwipeToIndex(index);
                    }, key: "" + index }, focusSwipeIndex === index ? "FullCircleMask" : "CircleRing")); }),
                React.createElement(IconButton_1.default, { style: { marginLeft: 2 }, size: 32, onClick: toggleCanAutoSwipe }, currCanAutoSwipe ? "Pause" : "Play")))));
    };
    Dots.contextTypes = { theme: PropTypes.object };
    return Dots;
}(React.Component));
exports.Dots = Dots;
exports.default = Dots;
//# sourceMappingURL=Dots.js.map