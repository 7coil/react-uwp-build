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
exports.Toggle = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var emptyFunc = function () { };
var Toggle = /** @class */ (function (_super) {
    __extends(Toggle, _super);
    function Toggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currToggled: _this.props.defaultToggled
        };
        _this.toggleToggle = function (currToggled) {
            if (typeof currToggled === "boolean") {
                if (currToggled !== _this.state.currToggled) {
                    _this.props.onToggle(currToggled);
                    _this.setState({ currToggled: currToggled });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) {
                    currToggled = !prevState.currToggled;
                    _this.props.onToggle(currToggled);
                    return { currToggled: currToggled };
                });
            }
        };
        return _this;
    }
    Toggle.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultToggled = nextProps.defaultToggled;
        if (this.state.currToggled !== defaultToggled) {
            this.setState({ currToggled: defaultToggled });
        }
    };
    Toggle.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, defaultToggled = _a.defaultToggled, onToggle = _a.onToggle, label = _a.label, background = _a.background, attributes = __rest(_a, ["style", "className", "defaultToggled", "onToggle", "label", "background"]);
        var currToggled = this.state.currToggled;
        var theme = this.context.theme;
        var styles = theme.prepareStyles({
            styles: getStyles(this),
            className: "toggle"
        });
        return (React.createElement("div", __assign({}, attributes, { style: styles.root.style, className: theme.classNames(styles.root.className, className) }),
            React.createElement("div", __assign({}, styles.wrapper, { onClick: this.toggleToggle }),
                React.createElement("div", __assign({}, styles.button))),
            label && (React.createElement("span", __assign({}, styles.label), label))));
    };
    Toggle.defaultProps = {
        size: 18,
        onToggle: emptyFunc
    };
    Toggle.contextTypes = { theme: PropTypes.object };
    return Toggle;
}(React.Component));
exports.Toggle = Toggle;
function getStyles(toggle) {
    var _a = toggle.props, size = _a.size, background = _a.background, style = _a.style;
    var theme = toggle.context.theme;
    var currToggled = toggle.state.currToggled;
    return {
        root: theme.prefixStyle(__assign({ display: "inline-block", verticalAlign: "middle", cursor: "default" }, style)),
        wrapper: theme.prefixStyle({
            userSelect: "none",
            position: "relative",
            display: "inline-block",
            verticalAlign: "middle",
            boxSizing: "content-box",
            width: size * 2.5,
            height: size,
            background: currToggled ? theme.accent : (background || "none"),
            border: size / 9 + "px solid " + (currToggled ? theme.accent : theme.baseMediumHigh),
            borderRadius: size * 2,
            transition: "all .25s ease-in-out"
        }),
        button: theme.prefixStyle({
            transform: "translateX(" + (currToggled ? size * 2.5 - size / 1.5 - size / 9 : size / 4.5) + "px)",
            flex: "0 0 auto",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
            width: size / 1.5,
            height: size / 1.5,
            borderRadius: size / 1.5,
            background: currToggled ? "#fff" : theme.baseMediumHigh,
            transition: "all .25s 0s ease-in-out"
        }),
        label: {
            marginLeft: size / 4,
            verticalAlign: "middle",
            fontSize: size / 1.5,
            lineHeight: size / 1.5 + "px"
        }
    };
}
exports.default = Toggle;
//# sourceMappingURL=index.js.map