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
var SlideInOut_1 = require("../Animate/SlideInOut");
var SemanticZoom = /** @class */ (function (_super) {
    __extends(SemanticZoom, _super);
    function SemanticZoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showController: false
        };
        _this.toggleShowController = function (showController) {
            if (typeof showController === "boolean" && showController !== _this.state.showController) {
                _this.setState({ showController: showController });
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    showController: prevState.showController
                }); });
            }
        };
        return _this;
    }
    SemanticZoom.prototype.render = function () {
        var attributes = __rest(this.props, []);
        var theme = this.context.theme;
        var showController = this.state.showController;
        var styles = getStyles(this);
        return (React.createElement(SlideInOut_1.default, __assign({}, attributes, { style: styles.root }), showController ? (React.createElement("div", { key: "" + showController }, "SemanticZoomController")) : (React.createElement("div", { key: "" + showController }, "SemanticZoomView"))));
    };
    SemanticZoom.contextTypes = { theme: PropTypes.object };
    return SemanticZoom;
}(React.Component));
exports.default = SemanticZoom;
function getStyles(semanticZoom) {
    var theme = semanticZoom.context.theme, style = semanticZoom.props.style;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ fontSize: 14, color: theme.baseMediumHigh, background: theme.altMediumHigh }, style))
    };
}
//# sourceMappingURL=index.js.map