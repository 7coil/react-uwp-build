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
exports.Mock = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Mock = /** @class */ (function (_super) {
    __extends(Mock, _super);
    function Mock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    Mock.prototype.render = function () {
        var attributes = __rest(this.props, []);
        var theme = this.context.theme;
        var styles = getStyles(this);
        return (React.createElement("div", __assign({}, attributes, { style: styles.root }), "Mock"));
    };
    Mock.defaultProps = {};
    Mock.contextTypes = { theme: PropTypes.object };
    return Mock;
}(React.Component));
exports.Mock = Mock;
function getStyles(mock) {
    var theme = mock.context.theme, style = mock.props.style;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ fontSize: 14, color: theme.baseMediumHigh, background: theme.altMediumHigh }, style))
    };
}
exports.default = Mock;
//# sourceMappingURL=index.js.map