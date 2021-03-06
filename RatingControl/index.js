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
exports.RatingControl = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Icon_1 = require("../Icon");
var emptyFunc = function () { };
var RatingControl = /** @class */ (function (_super) {
    __extends(RatingControl, _super);
    function RatingControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currRating: _this.props.defaultRating
        };
        _this.handleRationClick = function (e, index) {
            var _a = _this.props, iconPadding = _a.iconPadding, maxRating = _a.maxRating;
            var lastIndex = maxRating - 1;
            var clientRect = e.currentTarget.getBoundingClientRect();
            var left = e.clientX - clientRect.left;
            var offset = left / (index === lastIndex ? clientRect.width : clientRect.width - iconPadding);
            if (offset > 1)
                offset = 1;
            var currRating = index + offset;
            _this.setState({ currRating: currRating });
            _this.props.onChangeRating(currRating);
        };
        return _this;
    }
    RatingControl.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.defaultRating !== this.state.currRating) {
            this.setState({ currRating: nextProps.defaultRating });
        }
    };
    RatingControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, defaultRating = _a.defaultRating, maxRating = _a.maxRating, icon = _a.icon, iconStyle = _a.iconStyle, iconRatedStyle = _a.iconRatedStyle, onChangeRating = _a.onChangeRating, label = _a.label, isReadOnly = _a.isReadOnly, iconPadding = _a.iconPadding, attributes = __rest(_a, ["defaultRating", "maxRating", "icon", "iconStyle", "iconRatedStyle", "onChangeRating", "label", "isReadOnly", "iconPadding"]);
        var theme = this.context.theme;
        var currRating = this.state.currRating;
        var ratio = currRating / maxRating;
        var fontSize = iconStyle ? (+Number(iconStyle.fontSize) || 24) : 24;
        var width = fontSize * maxRating + iconPadding * (maxRating - 1);
        var offset = Math.floor(currRating) * (fontSize + iconPadding) + (currRating % 1) * fontSize;
        var lastIndex = maxRating - 1;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "rating-control",
            styles: inlineStyles
        });
        var renderRatings = function (notRated) {
            if (notRated === void 0) { notRated = true; }
            return (React.createElement("div", { style: theme.prefixStyle(__assign(__assign({}, (notRated ? styles.group.style : styles.groupMask.style)), (notRated ? void 0 : {
                    clipPath: "polygon(0% 0%, " + offset + "px 0%, " + offset + "px 100%, 0% 100%)",
                }))), className: notRated ? styles.group.className : styles.groupMask.className }, Array(maxRating).fill(0).map(function (zero, index) { return (React.createElement(Icon_1.default, { key: "" + index, style: __assign(__assign({ fontSize: 24, paddingRight: index === lastIndex ? 0 : iconPadding }, iconStyle), (notRated ? void 0 : iconRatedStyle)), onClick: isReadOnly ? void 0 : function (e) {
                    _this.handleRationClick(e, index);
                } }, icon)); })));
        };
        var normalRender = (React.createElement("div", __assign({}, attributes, styles.root),
            renderRatings(),
            renderRatings(false)));
        return label ? (React.createElement("div", { style: { display: "inline-block" }, ref: function (rootElm) { return _this.rootElm = rootElm; } },
            React.createElement("div", __assign({}, styles.labelWrapper),
                normalRender,
                React.createElement("span", null, label)))) : normalRender;
    };
    RatingControl.defaultProps = {
        defaultRating: 2.5,
        maxRating: 5,
        icon: "FavoriteStarFill",
        onChangeRating: emptyFunc,
        iconPadding: 10
    };
    RatingControl.contextTypes = { theme: PropTypes.object };
    return RatingControl;
}(React.Component));
exports.RatingControl = RatingControl;
function getStyles(RatingControl) {
    var theme = RatingControl.context.theme, style = RatingControl.props.style;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ color: theme.baseMediumHigh, display: "inline-block", position: "relative", cursor: "default" }, style)),
        group: prefixStyle({
            display: "inline-block",
            transition: "all .25s"
        }),
        groupMask: prefixStyle({
            display: "inline-block",
            transition: "all .25s",
            color: theme.accent,
            position: "absolute",
            top: 0,
            left: 0
        }),
        labelWrapper: prefixStyle({
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        })
    };
}
exports.default = RatingControl;
//# sourceMappingURL=index.js.map