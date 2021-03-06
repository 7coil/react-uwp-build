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
exports.ProgressBar = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var vendors_1 = require("../utils/browser/vendors");
var vendorPrefixes = vendors_1.default.map(function (str) { return str ? "-" + str + "-" : str; });
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.getOnlyClassName = function () {
            var speed = _this.props.speed;
            return "react-uwp-progress-bar_" + speed;
        };
        _this.getCSSText = function (className) {
            var _a = _this.props, speed = _a.speed, barHeight = _a.barHeight, barWidth = _a.barWidth;
            return ("." + className + " {\n}\n" + Array(5).fill(0).map(function (name, index) { return (["." + className + "-item-" + index + " {",
                vendorPrefixes.map(function (str) { return ("    " + str + "animation: ProgressBar " + speed + "ms " + index * barHeight * barWidth * speed / 5 / 10e3 + "ms cubic-bezier(0.25, 0.75, 0.75, 0.25) infinite normal forwards;"); }).join("\n"), "  }"].join("")); }).join("") + "\n\n" + vendorPrefixes.map(function (str) { return "@" + str + "keyframes ProgressBar {\n  0% {\n    left: -" + barHeight + "px;\n  }\n  15% {\n    left: -" + barHeight + "px;\n  }\n  85% {\n    left: " + (barWidth + barHeight) + "px;\n  }\n  100% {\n    left: " + (barWidth + barHeight) + "px;\n  }\n}"; }) + ".join(\"\")");
        };
        return _this;
    }
    ProgressBar.prototype.render = function () {
        var _a = this.props, defaultProgressValue = _a.defaultProgressValue, isIndeterminate = _a.isIndeterminate, speed = _a.speed, barWidth = _a.barWidth, barHeight = _a.barHeight, className = _a.className, attributes = __rest(_a, ["defaultProgressValue", "isIndeterminate", "speed", "barWidth", "barHeight", "className"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "progress-bar",
            styles: inlineStyles
        });
        var onlyClassName = this.getOnlyClassName();
        theme.styleManager.addCSSText(this.getCSSText(onlyClassName));
        return (React.createElement("div", __assign({}, attributes, { style: styles.root.style, className: theme.classNames(styles.root.className, className) }),
            React.createElement("div", __assign({}, styles.bar), isIndeterminate ? Array(5).fill(0).map(function (numb, index) { return (React.createElement("div", { key: "" + index, className: theme.classNames(styles.item.className, onlyClassName + "-item-" + index), style: styles.item.style })); }) : null)));
    };
    ProgressBar.defaultProps = {
        speed: 4000,
        barWidth: 320,
        barHeight: 4,
        isIndeterminate: false,
        defaultProgressValue: 0.5
    };
    ProgressBar.contextTypes = { theme: PropTypes.object };
    return ProgressBar;
}(React.Component));
exports.ProgressBar = ProgressBar;
function getStyles(progressBar) {
    var theme = progressBar.context.theme, _a = progressBar.props, style = _a.style, barWidth = _a.barWidth, barHeight = _a.barHeight, isIndeterminate = _a.isIndeterminate, defaultProgressValue = _a.defaultProgressValue;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ display: "inline-block", verticalAlign: "middle", background: isIndeterminate ? void 0 : theme.chromeLow, overflow: "hidden", width: barWidth, height: barHeight }, style)),
        bar: prefixStyle({
            overflow: "hidden",
            background: isIndeterminate ? void 0 : theme.accent,
            position: "relative",
            width: "100%",
            height: "100%",
            transform: isIndeterminate ? void 0 : "translate3d(-" + (1 - defaultProgressValue) * 100 + "%, 0, 0)"
        }),
        item: {
            background: theme.listAccentHigh,
            position: "absolute",
            top: 0,
            left: -barHeight,
            width: barHeight,
            height: barHeight,
            borderRadius: barHeight
        }
    };
}
exports.default = ProgressBar;
//# sourceMappingURL=index.js.map